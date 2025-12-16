import { motion } from "framer-motion";
import {
  Code,
  Server,
  Brain,
  Database,
  GitBranch,
  Layout,
} from "lucide-react";

const skills = [
  {
    title: "Languages",
    icon: <Code size={20} />,
    emoji: "💻",
    glow: "0 0 35px rgba(236,72,153,0.35)",
    items: ["Python", "JavaScript", "SQL", "HTML / CSS","c", "C++"],
  },
  {
    title: "Backend",
    icon: <Server size={20} />,
    emoji: "🛠️",
    glow: "0 0 35px rgba(34,211,238,0.35)",
    items: ["Django", "Flask", "REST APIs", "Fast API"],
  },
  {
    title: "AI & Machine Learning",
    icon: <Brain size={20} />,
    emoji: "🧠",
    glow: "0 0 40px rgba(168,85,247,0.4)",
    items: ["TensorFlow", "PyTorch", "NumPy", "OpenCV"],
  },
  {
    title: "Databases",
    icon: <Database size={20} />,
    emoji: "🗄️",
    glow: "0 0 35px rgba(99,102,241,0.35)",
    items: ["MySQL", "Postgresql"],
  },
  {
    title: "Version Control",
    icon: <GitBranch size={20} />,
    emoji: "🌱",
    glow: "0 0 35px rgba(56,189,248,0.35)",
    items: ["Git", "GitHub"],
  },
  {
    title: "Frontend",
    icon: <Layout size={20} />,
    emoji: "🎨",
    glow: "0 0 40px rgba(244,114,182,0.4)",
    items: ["React.js", "Framer Motion", "Tailwind CSS"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-[#111827] text-gray-200 px-6 py-36"
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center mb-24"
      >
        <p className="text-sm tracking-[0.35em] text-gray-400">
          SKILLS
        </p>

        <h2 className="text-4xl md:text-5xl font-extrabold mt-6">
          Technical <span className="text-(--accent)">Expertise</span>
        </h2>

        <p className="text-gray-400 mt-8">
          Technologies and tools I use to build intelligent systems.
        </p>
      </motion.div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            whileHover={{ y: -8, boxShadow: skill.glow }}
            className="
              rounded-2xl p-8
              bg-[#0B0F1A]
              border border-white/10
            "
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-(--accent)">
                  {skill.icon}
                </span>
                <h3 className="text-lg font-semibold">
                  {skill.title}
                </h3>
              </div>

              <span className="text-2xl">{skill.emoji}</span>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-300">
              {skill.items.map((item, idx) => (
                <span key={idx} className="text-sm">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
