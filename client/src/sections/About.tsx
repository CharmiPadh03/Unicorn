import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import type { JourneyItem } from "../types";

/* ================= DECRYPTED TEXT ================= */

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

interface DecryptedTextProps {
  text: string;
  start: boolean;
}

function DecryptedText({ text, start }: DecryptedTextProps) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start || done) return;

    let frame = 0;
    const speed = 65;
    const revealSpeed = 8;

    const interval = setInterval(() => {
      frame++;
      setDisplay(
        text
          .split("")
          .map((char, i) =>
            frame > i * revealSpeed
              ? char
              : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("")
      );

      if (frame >= text.length * revealSpeed + 10) {
        clearInterval(interval);
        setDisplay(text);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [start, text, done]);

  return <span>{display || text}</span>;
}

/* ================= ANIMATIONS ================= */

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.6,
      delayChildren: 0.4,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Horizontal rail — drawn left-to-right on lg+ where the timeline is a row. */
const timelineX: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 2.2,
      ease: "easeInOut",
    },
  },
};

/** Vertical rail — drawn top-to-bottom below lg, where the timeline stacks. */
const timelineY: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 2.2,
      ease: "easeInOut",
    },
  },
};

/* ===== FAST & SMOOTH WORD REVEAL ===== */

const paragraphContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.3,
    },
  },
};

const wordAnim: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: "easeOut",
    },
  },
};

/* ================= DATA ================= */

const journey: JourneyItem[] = [
  {
    title: "Class 10th",
    year: "2019 – 2020",
    institute: "Shri P.V Modi School",
    location: "Jamnagar, Gujarat",
  },
  {
    title: "Class 12th",
    year: "2020 – 2022",
    institute: "Shri P.V Modi School",
    location: "Jamnagar, Gujarat",
  },
  {
    title: "B.E. Computer Engineering",
    year: "2023 – Present",
    institute: "LDRP Institute of Technology and Research",
    location: "Gandhinagar, Gujarat",
    current: true,
  },
];

/* ================= COMPONENT ================= */

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const isEducationInView = useInView(educationRef, {
    once: true,
    margin: "-120px",
  });

  const isParagraphInView = useInView(paragraphRef, {
    once: true,
    margin: "-120px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const startDecrypt = useInView(headingRef, {
    once: true,
    margin: "-120px",
  });

  const paragraphText = `I’m an ML Engineer and a Computer Engineering student (B.E., 6th
semester), focused on building intelligent systems that perform reliably
beyond controlled environments. Rather than concentrating solely on
model accuracy, I prioritize understanding data behavior, system
stability, and real-world performance. My work is driven by a
research-oriented mindset, strong engineering discipline, and
continuous experimentation to deliver solutions that are robust,
interpretable, and practically deployable.`;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="
        relative bg-[#0B0F1A] text-gray-200
        px-5 sm:px-6
        py-16 md:py-32
        space-y-16 md:space-y-32
        overflow-hidden
      "
    >
      {/* Scroll Indicator */}
      <div className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 h-56 w-px bg-white/10">
        <motion.div
          style={{ height }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="w-px bg-[#4F8CFF]"
        />
      </div>

      {/* ABOUT */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs sm:text-sm tracking-[0.3em] text-gray-400"
        >
          ABOUT
        </motion.p>

        {/* 🔽 SIZE REDUCED HERE */}
        <motion.h1
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-6"
        >
          <DecryptedText text="Observe" start={startDecrypt} /> .
          <DecryptedText text="Model" start={startDecrypt} /> .
          <DecryptedText text="Refine" start={startDecrypt} /> .
          <DecryptedText text="Repeat" start={startDecrypt} />
        </motion.h1>

        <motion.p
          ref={paragraphRef}
          variants={paragraphContainer}
          initial="hidden"
          animate={isParagraphInView ? "visible" : "hidden"}
          className="mt-8 sm:mt-10 text-sm sm:text-base text-gray-400 leading-relaxed sm:leading-loose"
        >
          {paragraphText.split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={wordAnim}
              className="inline-block mr-1"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>

      {/* EDUCATION */}
      <div ref={educationRef} className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10 md:mb-16">
          <GraduationCap size={26} />
          <h2 className="text-2xl sm:text-3xl font-bold">Education</h2>
        </div>

        {/* Stacks vertically below lg; becomes a horizontal timeline at lg+. */}
        <div className="relative pb-6 lg:pb-16">
          {/* Vertical rail (mobile / tablet) — sits on the circle centres. */}
          <motion.div
            variants={timelineY}
            initial="hidden"
            animate={isEducationInView ? "visible" : "hidden"}
            className="lg:hidden origin-top absolute top-6 bottom-6 left-6 w-px bg-white/20"
          />

          {/* Horizontal rail (lg+) */}
          <motion.div
            variants={timelineX}
            initial="hidden"
            animate={isEducationInView ? "visible" : "hidden"}
            className="hidden lg:block origin-left absolute top-7 left-0 w-full h-px bg-white/20"
          />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
            {journey.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                animate={isEducationInView ? "visible" : "hidden"}
                className="flex items-start gap-5 lg:block lg:max-w-xs"
              >
                <div
                  className={`shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center lg:mb-8
                  ${
                    item.current
                      ? "border-2 border-[#4F8CFF] shadow-[0_0_28px_rgba(79,140,255,0.45)]"
                      : "border border-white/30"
                  } bg-[#0B0F1A]`}
                >
                  <GraduationCap size={20} />
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{item.year}</p>

                  <div className="mt-3 lg:mt-5 space-y-1 text-sm text-gray-300">
                    <p>{item.institute}</p>
                    <p className="text-gray-400">{item.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
