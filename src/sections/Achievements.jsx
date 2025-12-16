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
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 bg-[#0E1324]">
      <h2 className="text-4xl font-bold text-center mb-16">
        Achievements<span className="text-(--accent)">.</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {achievements.map((a, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="relative p-6 rounded-2xl bg-white/5 border border-white/10 
                       overflow-hidden group"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-(--accent)/20 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity" />

            <Trophy className="text-(--accent) mb-4" />
            <h3 className="text-lg font-semibold">{a.title}</h3>
            <p className="text-sm text-(--text-muted) mt-2">{a.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
