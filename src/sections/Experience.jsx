import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "AI/ML Intern",
    org: "Reliance Industries Ltd",
    period: "May 2025 – July 2025",
    desc: "Developed CNN-LSTM models for real-time gasifier refractory life prediction and built Power BI dashboards.",
  },
  {
    role: "Research & Hackathon Developer",
    org: "Multiple Hackathons",
    period: "2023 – Present",
    desc: "Worked on Deepfake Detection, Fraud Analytics, Quantum Simulation & Smart Systems.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-[#0B0F1A] relative">
      <h2 className="text-4xl font-bold text-center mb-20">
        Experience<span className="text-(--accent)">.</span>
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-(--accent)/60 to-transparent" />

        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            className={`relative w-1/2 p-6 rounded-xl backdrop-blur 
              bg-white/5 border border-white/10 shadow-lg
              ${i % 2 === 0 ? "ml-auto" : "mr-auto"}`}
          >
            {/* Icon */}
            <div className="absolute -top-4 -left-4 bg-(--accent) p-2 rounded-full">
              <Briefcase size={16} />
            </div>

            <h3 className="text-xl font-semibold">{exp.role}</h3>
            <p className="text-sm text-(--text-muted)">
              {exp.org} • {exp.period}
            </p>
            <p className="mt-3 text-sm leading-relaxed">{exp.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
