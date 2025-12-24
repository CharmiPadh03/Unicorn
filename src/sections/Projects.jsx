import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

/* ================= DATA (UNCHANGED EXCEPT GITHUB FIELD) ================= */

const projects = [
  {
    title: "SunAdapt – Smart Solar Optimization System",
    desc:
      "An intelligent system designed to optimize solar energy utilization by adapting panel orientation and energy distribution based on environmental conditions, usage patterns, and real-time data for maximum efficiency.",
    role: "AI/ML Developer.",
    tech: ["MATLAB", "MATLAB's Surf", "scatter3"],
    image: "/projects/sunadapt.png",
    github: "https://github.com/CharmiPadh03/SunAdapt",
  },
  {
    title: "Prompt Injection Detection & Mitigation",
    desc:
      "A security-focused AI system designed to detect, analyze, and mitigate prompt injection attacks in large language model applications by identifying malicious intent, instruction overrides, and context manipulation attempts.",
    role: "AI/ML Developer.",
    tech: [ "Python", "Transformers", "Pytorch"],
    image: "/projects/prompt-injection.png",
    github: "https://github.com/CharmiPadh03/Prompt-Injection-Prevention",
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
    title:
      "Quantum Simulation Tools – A Comprehensive Survey (Research Book Chapter)",
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
      <div className="relative z-10 max-w-screen-2xl mx-auto px-5 sm:px-8 md:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-sm tracking-widest text-(--accent)">
            WORK
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-2">
            Projects & <span className="text-(--accent)">Research</span>
          </h2>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center gap-4 mb-10">
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

        {/* LIST */}
        <div className="flex flex-col gap-8">
          {data.map((p, i) => (
            <motion.div
              key={`${activeTab}-${i}`}
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
              className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 sm:p-6"
            >
              {/* TOP RIGHT ICONS */}
              <div className="absolute top-4 right-4 flex gap-3">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:scale-110 transition"
                    title="View on GitHub"
                  >
                    <Github size={18} />
                  </a>
                )}

                {p.doi && (
                  <a
                    href={p.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--accent) hover:scale-110 transition"
                    title="View Publication"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-6 lg:gap-8 items-center">
                {/* Image */}
                <div className="w-full max-w-[460px] aspect-video overflow-hidden rounded-xl">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>

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
        </div>
      </div>
    </section>
  );
}
