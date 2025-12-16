import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const ease = 0.15; // smoothness
    let current = 0;
    let target = 0;

    function updateTarget() {
      const scrollTop = window.scrollY || 0;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollable = scrollHeight - clientHeight;

      target = scrollTop / scrollable;
      if (target < 0) target = 0;
      if (target > 1) target = 1;
    }

    function animate() {
      current += (target - current) * ease;
      bar.style.transform = `scaleX(${current})`;
      requestAnimationFrame(animate);
    }

    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);

    // initialize
    updateTarget();
    animate();

    return () => {
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-[5px] z-99999"
      style={{ pointerEvents: "none" }}
    >
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          transform: "scaleX(0)",
          transformOrigin: "left",
          willChange: "transform",
          background:
            "linear-gradient(90deg, #001133 0%, #4f8cff 50%, #a855f7 100%)",
        }}
      />
    </div>
  );
}
