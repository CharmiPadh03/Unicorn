import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useRef } from "react";

const experiences = [
  {
    role: "AI/ML Intern",
    org: "Reliance Industries Ltd",
    period: "May 2025 – July 2025",
    desc: "Developed CNN-LSTM models for real-time gasifier refractory life prediction and built Power BI dashboards.",
    image:
      "https://images.unsplash.com/photo-1581092334494-1f65f5c92b47",
  },
  {
    role: "Research & Hackathon Developer",
    org: "AI & DeepTech Hackathons",
    period: "2023 – Present",
    desc: "Worked on Deepfake Detection, Fraud Analytics, Quantum Simulation & Smart Systems.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  },
];

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={ref}
      className="py-28 bg-[#0B0F1A] relative overflow-hidden"
    >
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-24"
      >
        Experience<span className="text-(--accent)">.</span>
      </motion.h2>

      <div className="relative max-w-5xl mx-auto">
        {/* Animated Vertical Line */}
        <motion.div
          style={{ height: lineScale }}
          className="absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-(--accent) to-transparent"
        />

        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              rotateY: i % 2 === 0 ? -35 : 35,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              rotateY: 0,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
              delay: i * 0.15,
            }}
            viewport={{ once: true }}
            className={`relative w-[46%] mb-24
              ${i % 2 === 0 ? "ml-auto pr-6" : "mr-auto pl-6"}`}
          >
            {/* Timeline Node */}
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-10 -left-[22px] w-5 h-5 rounded-full bg-(--accent)"
            />

            {/* Card */}
            <div className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur shadow-xl">
              {/* Image */}
              <motion.img
                src={exp.image}
                alt={exp.role}
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1 }}
                className="h-44 w-full object-cover grayscale group-hover:grayscale-0 transition"
              />

              {/* Content */}
              <div className="p-6 relative">
                <div className="absolute -top-5 -right-5 bg-(--accent) p-2 rounded-full">
                  <Briefcase size={16} />
                </div>

                <h3 className="text-xl font-semibold">{exp.role}</h3>
                <p className="text-sm text-(--text-muted)">
                  {exp.org} • {exp.period}
                </p>
                <p className="mt-3 text-sm leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
