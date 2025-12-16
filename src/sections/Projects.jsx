import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

/* ================= ANIMATIONS ================= */

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const imageFloat = {
  animate: {
    y: [0, -4, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

/* ================= DATA ================= */
/* (UNCHANGED — keeping your content exactly same) */

const projects = [
  {
    title: "SunAdapt – Smart Solar Optimization System",
    desc:
      "An intelligent system designed to optimize solar energy utilization by adapting panel orientation and energy distribution based on environmental conditions, usage patterns, and real-time data for maximum efficiency.",
    role: "AI/ML Developer.",
    tech: ["Machine Learning", "IoT", "Data Analytics", "Python"],
    image: "/projects/sunadapt.png",
    live: "#",
    github: "#",
  },
  {
    title: "Prompt Injection Detection & Mitigation",
    desc:
      "A security-focused AI system designed to detect, analyze, and mitigate prompt injection attacks in large language model applications by identifying malicious intent, instruction overrides, and context manipulation attempts.",
    role: "AI/ML Developer.",
    tech: ["NLP", "LLM Security", "Python", "Transformers"],
    image: "/projects/prompt-injection.png",
    live: "#",
    github: "#",
  },
  {
    title: "Gasifier Reactor Refractory Lifespan Prediction",
    desc:
      "Developed a machine learning–based predictive maintenance system to estimate the effective lifespan of gasifier reactor refractory bricks using real-time process data and laboratory parameters during an internship at Reliance Industries Limited.",
    role: "ML Engineer Intern (May 14 – June 14, 2025)",
    tech: [
      "Machine Learning",
      "Time-Series Analysis",
      "Python",
      "Industrial Process Data",
    ],
    image: "/projects/Reliance.png",
  },
  {
    title: "Reinforcement Learning–Based Intelligent System (IPR Internship)",
    desc:
      "Currently working on a reinforcement learning–based research project at IPR, focusing on designing and training agents to learn optimal decision-making strategies through interaction with dynamic environments.",
    role: "Project Trainee (Ongoing – 4 Months)",
    tech: ["Reinforcement Learning", "Python", "Deep Learning", "Simulation"],
    image: "/projects/ipr-rl.png",
  },
];

const researchProjects = [
  {
    title: "TrafficEye – Intelligent Traffic Violation Detection System",
    desc:
      "A computer vision–based system for automated detection of traffic violations from video streams using deep learning techniques.",
    note:
      "Presented and published at the 2nd IEEE International Conference on Artificial Intelligence, Machine Vision (AIMV 2025).",
    authors:
      "Prem Raichura, Charmi Padh, Rohan Thakar, Zalak Vachhani, Himani Trivedi",
    tech: ["Computer Vision", "Deep Learning", "YOLO", "OpenCV", "Python"],
    image: "/projects/TrafficEye.png",
    doi: "https://doi.org/10.1109/AIMV66517.2025.11203522",
  },
  {
    title: "Quantum Simulation Tools – A Comprehensive Survey(Research Book Chapter)",
    desc:
      "A comparative study of prominent quantum simulation platforms, analyzing their capabilities and applicability for quantum algorithm development and experimentation.",
    note:
      "Accepted Research Book Chapter • Springer Series: Studies in Computational Intelligence",
    authors:
      "Zeel Kanudawala, Zenisha Devani, Rohan Thakkar, Charmi Padh, Himani Trivedi",
    tech: [
      "Quantum Computing",
      "Quantum Simulation",
      "Qiskit",
      "Azure Quantum",
      "Cirq",
    ],
    image: "/projects/Researchbookchapter.png",
  },
];

/* ================= COMPONENT ================= */

export default function Projects() {
  const [activeTab, setActiveTab] = useState("projects");
  const data = activeTab === "projects" ? projects : researchProjects;

  return (
    <section
      id="projects"
      className="relative py-16 md:py-20 bg-linear-to-b from-[#0B0F1A] via-[#0E1324] to-[#0B0F1A]"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-purple-500/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[260px] md:w-[300px] h-[260px] md:h-[300px] bg-cyan-400/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-5 sm:px-8 md:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-sm tracking-widest text-(--accent)">
            WORK & RESEARCH
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-2">
            Projects & <span className="text-(--accent)">Research</span>
          </h2>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {["projects", "research"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-(--accent) text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {tab === "projects" ? "Projects" : "Research"}
            </button>
          ))}
        </div>

        {/* Cards */}
        <motion.div
          key={activeTab}
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {data.map((p, i) => (
            <motion.div
              key={`${activeTab}-${i}`}
              variants={card}
              className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 sm:p-6"
            >
              {p.doi && (
                <a
                  href={p.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 text-(--accent)"
                >
                  <ExternalLink size={18} />
                </a>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-6 lg:gap-8 items-center">
                {/* Image */}
                <motion.div
                  variants={imageFloat}
                  animate="animate"
                  className="w-full flex justify-center"
                >
                  <div className="w-full max-w-[460px] aspect-video flex items-center justify-center">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1">
                    {p.title}
                  </h3>

                  <p className="text-(--text-muted) text-sm mb-2">
                    {p.desc}
                  </p>

                  {p.note && (
                    <p className="text-xs text-(--accent) mb-1">
                      {p.note}
                    </p>
                  )}

                  {p.authors && (
                    <p className="text-xs text-(--text-muted) mb-2">
                      <span className="font-semibold text-white">
                        Authors:
                      </span>{" "}
                      {p.authors}
                    </p>
                  )}

                  {p.role && (
                    <p className="text-xs text-(--accent) mb-2">
                      {p.role}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs rounded-full bg-white/10 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
