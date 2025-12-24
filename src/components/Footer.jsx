import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-[#0B0F1A]">
      
      {/* Glow Line */}
      <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-[#4F8CFF]/40 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container-max py-8 text-center space-y-2"
      >
        {/* Name */}
        <p className="text-sm tracking-wide text-white/80">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">Charmi Padh</span>
        </p>

        {/* Tagline */}
        <p className="text-xs text-(--text-muted)">
          Designing intelligent systems · Research-driven engineering
        </p>

        {/* Rights */}
        <p className="text-[11px] text-white/30">
          All rights reserved
        </p>
      </motion.div>
    </footer>
  );
}
