import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Gasifier Reactor Refractory Lifespan Prediction",
    org: "Reliance Industries Limited",
    role: "ML Engineer Intern",
    period: "May 14 – June 14, 2025",
    description:
      "Developed a machine learning–based predictive maintenance system to estimate the effective lifespan of gasifier reactor refractory bricks using real-time industrial process data and laboratory parameters. Focused on time-series learning, reliability-aware features, and deployment-ready modeling.",
    skills: [
      "Machine Learning",
      "Time-Series Analysis",
      "Python",
      "Industrial Process Data",
    ],
    image: "/projects/Reliance.png",
  },
  {
    title: "Reinforcement Learning–Based Intelligent System",
    org: "Institute for Plasma Research (IPR)",
    role: "Project Trainee",
    period: "Ongoing – 4 Months",
    description:
      "Working on a reinforcement learning–driven research system focused on training intelligent agents that learn optimal decision-making strategies through interaction with dynamic and simulated environments.",
    skills: [
      "Reinforcement Learning",
      "Deep Learning",
      "Python",
      "Simulation",
    ],
    image: "/projects/ipr-rl.png",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-28 bg-[#0B0F1A] overflow-hidden"
    >
      {/* SECTION HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-24"
      >
        Experience<span className="text-(--accent)">.</span>
      </motion.h2>

      <div className="space-y-32">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative max-w-6xl mx-auto px-6"
          >
            {/* SMALL IMAGE PANEL */}
            {exp.image && (
              <motion.div
                initial={{
                  x: i % 2 === 0 ? -120 : 120,
                  scale: 1.15,
                  opacity: 0,
                }}
                whileInView={{
                  x: 0,
                  scale: 1,
                  opacity: 1,
                }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`
                  relative h-40 md:h-[260px]
                  overflow-hidden rounded-2xl
                  ${i % 2 === 0 ? "md:ml-0" : "md:ml-auto"}
                `}
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="
                    absolute inset-0
                    w-full h-full
                    object-cover
                  "
                />

                {/* SOFT OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/25 to-black/10" />
              </motion.div>
            )}

            {/* TEXT PANEL */}
            <motion.div
              initial={{
                y: 90,
                opacity: 0,
                clipPath: "inset(100% 0 0 0)",
              }}
              whileInView={{
                y: 0,
                opacity: 1,
                clipPath: "inset(0% 0 0 0)",
              }}
              transition={{ duration: 0.9, delay: 0.15 }}
              viewport={{ once: true }}
              className="
                relative z-10
                -mt-16 md:-mt-20
                bg-[#0B0F1A]/90
                backdrop-blur-xl
                border border-white/10
                rounded-2xl
                p-6 md:p-8
                max-w-3xl
              "
            >
              <div className="flex items-start gap-3">
                <div className="text-(--accent)">
                  <Briefcase size={18} />
                </div>

                <div>
                  <h3 className="text-lg md:text-2xl font-semibold">
                    {exp.title}
                  </h3>

                  <p className="text-sm text-(--text-muted)">
                    {exp.role} • {exp.org}
                  </p>

                  <p className="text-xs text-(--text-muted)">
                    {exp.period}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed">
                {exp.description}
              </p>

              {/* SKILLS */}
              <div className="mt-6 flex flex-wrap gap-3">
                {exp.skills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    viewport={{ once: true }}
                    className="
                      text-xs px-4 py-1.5
                      border border-(--accent)/40
                      text-(--accent)
                      rounded-full
                      tracking-wide
                    "
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
