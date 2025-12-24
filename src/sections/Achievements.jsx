import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ================= ACHIEVEMENTS DATA ================= */

const achievements = [
  {
    title: "IEEE AIMV 2025 – Research Paper & Conference Grant",
    subtitle:
      "2nd IEEE International Conference on Artificial Intelligence & Machine Vision (AIMV 2025)",
    images: [
      "/achievements/conferencegrant/conferencegrant.jpg",
      "/achievements/conferencegrant/conferencegrant2.jpg",
      "/achievements/conferencegrant/TrafficEye.png",
    ],
    description:
      "Received a conference grant of ₹2,500 for presenting and publishing the research paper titled “TrafficEye: Intelligent Traffic Optimization Using a Deep Learning Approach” at IEEE AIMV 2025.",
    tags: ["IEEE", "Research Publication", "Deep Learning", "Traffic AI"],
  },
  {
    title: "Research Project Grant – Secure Park",
    subtitle: "M. M. Patel Students Research Project Cell (MMPSRC), KSV",
    images: [
      "/achievements/securepark/letter.jpg",
      "/achievements/securepark/securepark.jpg",
      "/achievements/securepark/securepark.1.jpg",
      "/achievements/securepark/securepark3.jpg",
    ],
    description:
      "Awarded a research project grant of ₹69,017 for the project “Secure Park: Real-Time Edge AI Vision and IoT-Based Campus Security and Parking Ecosystem for KSV.”",
    tags: ["Research Grant", "Edge AI", "IoT", "Computer Vision"],
  },
  {
    title: "International Conference Paper Presentation",
    subtitle: "Academic Research & Scholarly Communication",
    layout: "landscape",
    images: [
      "/achievements/aimv2025/aimvcertificate.jpg",
      "/achievements/aimv2025/conference1.jpg",
      "/achievements/aimv2025/conference2.jpg",
    ],
    description:
      "Presented a peer-reviewed research paper at an international academic conference.",
    tags: ["Conference", "Research", "Presentation"],
  },
  {
    title: "Summer Internship – Reliance Industries Limited",
    subtitle: "AI/ML & Predictive Analytics Internship",
    images: [
      "/achievements/reliance/certificate.jpg",
      "/achievements/reliance/internship.jpg",
    ],
    description:
      "Completed a summer internship at Reliance Industries Limited, working on real-time AI/ML solutions and predictive analytics.",
    tags: ["Internship", "AI/ML", "Industry Experience"],
  },
  {
    title: "NPTEL Online Certification",
    subtitle: "SWAYAM | IITs & IISc (Government of India)",
    layout: "landscape",
    images: ["/achievements/nptel/nptelcertificate.jpg"],
    description:
      "Successfully completed an NPTEL certified course through SWAYAM.",
    tags: ["NPTEL", "Certified Learning", "Academics"],
  },
];

/* ================= ANIMATIONS ================= */

const containerAnim = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardAnim = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const imageHover = {
  hover: {
    scale: 1.06,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const modalAnim = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, scale: 0.95, y: 10 },
};

/* ================= COMPONENT ================= */

export default function Achievements() {
  const [activeItem, setActiveItem] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  const nextImage = () =>
    setImgIndex((p) => (p === activeItem.images.length - 1 ? 0 : p + 1));
  const prevImage = () =>
    setImgIndex((p) => (p === 0 ? activeItem.images.length - 1 : p - 1));

  return (
    <section id="achievements" className="py-20 bg-black text-white">
      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-14"
      >
        Achievements<span className="text-(--accent)">.</span>
      </motion.h2>

      {/* GRID */}
      <motion.div
        variants={containerAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full px-8 lg:px-12"
      >
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-10 space-y-10">
          {achievements.map((item, idx) => {
            const isLandscape = item.layout === "landscape";

            return (
              <motion.div
                key={idx}
                variants={cardAnim}
                whileHover={{ y: -6 }}
                onClick={() => {
                  setActiveItem(item);
                  setImgIndex(0);
                }}
                className="break-inside-avoid overflow-hidden rounded-xl bg-[#0E1324] cursor-pointer group shadow-xl"
              >
                {/* IMAGE */}
                <div
                  className={`relative bg-[#0B0F1A] ${
                    isLandscape ? "aspect-4/3" : "aspect-3/4"
                  } overflow-hidden`}
                >
                  <motion.img
                    src={item.images[0]}
                    alt={item.title}
                    variants={imageHover}
                    whileHover="hover"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-black/40 backdrop-blur-sm">
                    <h3 className="text-[15px] font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/90 mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* TAGS */}
                <div className="px-5 py-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-3 py-1 text-xs rounded-full bg-purple-500/15 text-purple-400"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              variants={modalAnim}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white text-2xl"
              >
                ✕
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIndex}
                  src={activeItem.images[imgIndex]}
                  className="max-w-full max-h-[60vh] mx-auto object-contain rounded-lg shadow-2xl"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>

              <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold">
                  {activeItem.title}
                </h3>
                <p className="text-white/80 mt-1">
                  {activeItem.subtitle}
                </p>
                <p className="text-white/70 mt-4 leading-relaxed">
                  {activeItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
