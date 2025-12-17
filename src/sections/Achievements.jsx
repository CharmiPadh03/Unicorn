import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const achievements = [
  {
    title: "Top 8 – TIC TECH TOE 2024",
    desc: "Selected among 70+ teams, represented LDRP at IEEE DAIICT SB.",
  },
  {
    title: "Bhartiya Antariksh Hackathon",
    desc: "Developed image-based lunar crater search system.",
  },
  {
    title: "Multiple Hackathon Finalist",
    desc: "AI, Finance, SpaceTech & Healthcare problem statements.",
  },
  {
    title: "IEEE AIMV 2025 – Research Paper Publication",
    desc:
      "Presented and published research work at the 2nd IEEE International Conference on Artificial Intelligence & Machine Vision (AIMV 2025). The work received institutional recognition and research grant support.",
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative py-24 bg-[#0E1324] overflow-hidden"
    >
      {/* HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-16"
      >
        Achievements<span className="text-(--accent)">.</span>
      </motion.h2>

      {/* LIST */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
        {achievements.map((a, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: i % 2 === 0 ? -120 : 120,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="
              relative
              bg-white/5 border border-white/10
              backdrop-blur-xl
              rounded-2xl
              p-6 md:p-7
              flex items-start gap-4
            "
          >
            {/* ICON */}
            <div className="text-(--accent) mt-1 shrink-0">
              <Trophy size={22} />
            </div>

            {/* CONTENT */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                {a.title}
              </h3>

              <p className="text-sm text-(--text-muted) mt-2 leading-relaxed">
                {a.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
