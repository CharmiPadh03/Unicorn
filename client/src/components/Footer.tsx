import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="mt-20 py-8 text-center text-sm bg-[#11162A]">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="tracking-wide text-white/60"
      >
        © {new Date().getFullYear()}{" "}
        <span className="font-medium text-[#8FB3FF]">
          Charmi Padh
        </span>
        .{" "}
        <span className="text-white/70">
          Turning curiosity into computation.
        </span>
      </motion.p>
    </footer>
  );
}
