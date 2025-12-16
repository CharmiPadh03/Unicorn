import React, { useRef, useEffect, useState } from "react";

/**
 * PixelQuadtree - adaptive pixelation driven by frame variance + motion
 *
 * Props:
 *  - videoSrc (string|null): optional URL to a video. If null and useFileUpload=true, user picks file.
 *  - useFileUpload (bool): show file input if true (default true).
 *  - maxTile (number): max tile size in pixels (coarsest block).
 *  - minTile (number): min tile size in pixels (finest block).
 *  - varianceThreshold (number): base threshold for variance that triggers subdivision.
 *  - motionBoost (number): how much motion increases subdivision sensitivity.
 *  - baseColor (string): color for the "figure" (default red).
 *  - bgColor (string): background color (default light gray).
 *
 * Example:
 * <PixelQuadtree useFileUpload={true} baseColor="#e53935" bgColor="#f0f0f0" />
 */
export default function PixelQuadtree({
  videoSrc = null,
  useFileUpload = true,
  maxTile = 48,
  minTile = 6,
  varianceThreshold = 600,
  motionBoost = 2.2,
  baseColor = "#e53935",
  bgColor = "#f0f0f0",
}) {
  const canvasRef = useRef(null);
  const offRef = useRef(null);
  const videoRef = useRef(null);
  const [status, setStatus] = useState("idle");

  // helper: read pixel luminance at index in Uint8ClampedArray
  function luminanceAt(data, idx) {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    const radius = Math.min(r, w / 2, h / 2);
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  // subdivide/draw quadtree-style
  function subdivideDraw(ctx, imgData, motionData, x, y, w, h, scale, params) {
    const { data, width: imgW } = imgData;

    // sample step to reduce compute
    const sx = Math.floor(x / scale);
    const sy = Math.floor(y / scale);
    const sw = Math.max(1, Math.floor(w / scale));
    const sh = Math.max(1, Math.floor(h / scale));
    const stepX = Math.max(1, Math.floor(sw / Math.min(20, Math.ceil(sw / (params.minTile)))));
    const stepY = Math.max(1, Math.floor(sh / Math.min(20, Math.ceil(sh / (params.minTile)))));

    let sum = 0, sum2 = 0, count = 0;
    for (let yy = sy; yy < sy + sh; yy += stepY) {
      for (let xx = sx; xx < sx + sw; xx += stepX) {
        const idx = (yy * imgW + xx) * 4;
        const lum = luminanceAt(data, idx);
        sum += lum;
        sum2 += lum * lum;
        count++;
      }
    }
    if (count === 0) return;
    const mean = sum / count;
    const variance = Math.max(0, sum2 / count - mean * mean);

    // motion metric
    let motion = 0, mcount = 0;
    if (motionData) {
      for (let yy = sy; yy < sy + sh; yy += stepY) {
        for (let xx = sx; xx < sx + sw; xx += stepX) {
          const mi = yy * imgW + xx;
          motion += Math.abs(motionData[mi] || 0);
          mcount++;
        }
      }
      if (mcount > 0) motion = motion / mcount;
    }

    const motionFactor = 1 + motion * params.motionBoost;
    const threshold = params.varianceThreshold / motionFactor;

    if ((variance > threshold) && (w > params.minTile * 1.1 || h > params.minTile * 1.1)) {
      const hw = Math.floor(w / 2);
      const hh = Math.floor(h / 2);
      subdivideDraw(ctx, imgData, motionData, x, y, hw, hh, scale, params);
      subdivideDraw(ctx, imgData, motionData, x + hw, y, w - hw, hh, scale, params);
      subdivideDraw(ctx, imgData, motionData, x, y + hh, hw, h - hh, scale, params);
      subdivideDraw(ctx, imgData, motionData, x + hw, y + hh, w - hw, h - hh, scale, params);
    } else {
      // sample center pixel color
      const cx = Math.floor((sx + Math.min(sw - 1, Math.floor(sw / 2))));
      const cy = Math.floor((sy + Math.min(sh - 1, Math.floor(sh / 2))));
      const cidx = (cy * imgW + cx) * 4;
      const r = data[cidx], g = data[cidx + 1], b = data[cidx + 2];
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      // decide figure vs background (tune if needed)
      const isFigure = lum < 200;

      const radius = Math.min(6, Math.min(w, h) * 0.12);
      ctx.fillStyle = isFigure ? params.baseColor : params.bgColor;
      roundRect(ctx, Math.round(x), Math.round(y), Math.round(w), Math.round(h), radius);
      ctx.fill();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const off = offRef.current;
    const video = videoRef.current;
    if (!canvas || !off || !video) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    const offCtx = off.getContext("2d", { alpha: false });

    let prevGray = null;
    let raf = null;
    const params = { minTile, maxTile, varianceThreshold, motionBoost, baseColor, bgColor };

    function processFrame() {
      if (video.readyState < 2) {
        raf = requestAnimationFrame(processFrame);
        return;
      }

      const vw = video.videoWidth || video.clientWidth || 640;
      const vh = video.videoHeight || video.clientHeight || 360;
      const maxW = Math.min(window.innerWidth, vw);
      const scale = maxW / vw;
      const drawW = Math.floor(vw * scale);
      const drawH = Math.floor(vh * scale);

      canvas.width = drawW;
      canvas.height = drawH;

      // analysis size
      const analysisW = Math.max(8, Math.floor(drawW / (params.maxTile / 2)));
      const analysisH = Math.max(8, Math.floor(drawH / (params.maxTile / 2)));
      off.width = analysisW;
      off.height = analysisH;

      offCtx.drawImage(video, 0, 0, analysisW, analysisH);
      const imgData = offCtx.getImageData(0, 0, analysisW, analysisH);

      // compute grayscale and motion map
      const gray = new Float32Array(analysisW * analysisH);
      for (let i = 0, p = 0; i < imgData.data.length; i += 4, p++) {
        const r = imgData.data[i], g = imgData.data[i + 1], b = imgData.data[i + 2];
        gray[p] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      }

      let motionMap = null;
      if (prevGray) {
        motionMap = new Float32Array(analysisW * analysisH);
        for (let i = 0; i < prevGray.length; i++) {
          motionMap[i] = Math.abs(gray[i] - prevGray[i]) / 255;
        }
      }
      prevGray = gray;

      // clear with bg
      ctx.fillStyle = params.bgColor;
      ctx.fillRect(0, 0, drawW, drawH);

      // draw quadtree
      subdivideDraw(ctx, imgData, motionMap, 0, 0, drawW, drawH, scale * (vw / analysisW), params);

      raf = requestAnimationFrame(processFrame);
    }

    function onPlay() {
      setStatus("running");
      if (!raf) raf = requestAnimationFrame(processFrame);
    }
    function onPause() {
      setStatus("paused");
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    }

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    if (!video.paused) onPlay();

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [videoSrc, baseColor, bgColor, minTile, maxTile, varianceThreshold, motionBoost]);

  function handleFile(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    const v = videoRef.current;
    v.src = url;
    v.play().catch(() => {});
    setStatus("loaded-file");
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        {useFileUpload && (
          <label className="inline-block px-3 py-2 bg-[rgba(255,255,255,0.04)] rounded-md cursor-pointer">
            Upload video
            <input type="file" accept="video/*" onChange={handleFile} style={{ display: "none" }} />
          </label>
        )}
        {videoSrc && <div className="text-sm text-(--text-muted)">Loaded video</div>}
        <div className="text-sm text-(--text-muted)">Status: {status}</div>
      </div>

      <video ref={videoRef} style={{ display: "none" }} playsInline muted loop />

      <canvas
        ref={canvasRef}
        style={{ width: "100%", maxWidth: "980px", background: bgColor, borderRadius: 8 }}
      />

      <canvas ref={offRef} style={{ display: "none" }} />
    </div>
  );
}
