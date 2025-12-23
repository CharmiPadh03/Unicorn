import { motion } from "framer-motion";
import { Github } from "lucide-react";
import LetterGlitchBackground from "../components/LetterGlitchBackground";

/* ================= ANIMATIONS ================= */

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

const fadeUpBlur = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const nameLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const nameRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const pulse = {
  animate: {
    boxShadow: [
      "0 0 0px rgba(165,107,255,0.2)",
      "0 0 14px rgba(165,107,255,0.45)",
      "0 0 0px rgba(165,107,255,0.2)",
    ],
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/* ================= COMPONENT ================= */

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-6"
    >
      <LetterGlitchBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="container-max text-center relative z-10"
      >
        {/* Availability Badge */}
        <motion.div
          variants={fadeUpBlur}
          className="mx-auto mb-6 sm:mb-8 inline-flex items-center gap-2
                     px-3 py-1.5 sm:px-4 rounded-full
                     border border-white/10 text-xs sm:text-sm text-gray-300"
          {...pulse}
        >
          <span className="w-2 h-2 rounded-full bg-[#A56BFF]" />
          Available for work
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUpBlur}
          className="text-sm sm:text-base text-(--text-muted)"
        >
          AI/ML Developer • Researcher
        </motion.p>

        {/* Main Heading */}
        <h1
          className="mt-6 sm:mt-8 leading-tight font-extrabold
                     text-3xl sm:text-5xl md:text-6xl"
        >
          <motion.span
            variants={nameLeft}
            className="inline-block mr-3 sm:mr-6"
          >
            Hi, I’m
          </motion.span>

          <motion.span
            variants={nameRight}
            className="inline-block text-(--accent)"
          >
            Charmi Padh
          </motion.span>
        </h1>

        {/* Description */}
        <motion.p
          variants={fadeUpBlur}
          className="text-sm sm:text-base text-(--text-muted)
                     max-w-xl sm:max-w-2xl mx-auto
                     mt-6 sm:mt-10 leading-relaxed"
        >
          I build intelligent deep learning models and modern full-stack
          applications focused on real-world reliability and impact.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUpBlur}
          className="flex flex-col sm:flex-row
                     justify-center gap-4 sm:gap-5
                     mt-8 sm:mt-10"
        >
          {/* Resume */}
          <motion.a
            href="/resume/Charmi_Padh_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(165,107,255,0.6)",
            }}
            whileTap={{ scale: 0.97 }}
            className="px-6 sm:px-7 py-3
                       text-sm sm:text-base
                       bg-(--accent) rounded-md"
          >
            Resume
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/CharmiPadh03"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 24px rgba(165,107,255,0.45)",
            }}
            whileTap={{ scale: 0.97 }}
            className="
              px-6 py-3 text-sm sm:text-base rounded-md
              bg-linear-to-r from-[#6D28D9] via-[#7C3AED] to-[#9333EA]
              text-white flex items-center justify-center gap-2
            "
          >
            <Github size={18} />
            GitHub
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
