import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useRef, useEffect, useState } from "react";

/* ================= DECRYPTED TEXT ================= */

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

function DecryptedText({ text, start }) {
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

  return <span className="inline-block">{display || text}</span>;
}

/* ================= ANIMATIONS ================= */

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.6,
      delayChildren: 0.4,
    },
  },
};

const fadeUp = {
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

/* ================= DATA ================= */

const journey = [
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
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const startDecrypt = useInView(headingRef, {
    once: true,
    margin: "-120px",
  });

  return (
    <section
      id="about" // ✅ REQUIRED FOR NAVBAR
      ref={sectionRef}
      className="relative bg-[#0B0F1A] text-gray-200 px-6 py-32 space-y-32 overflow-hidden"
    >
      {/* ================= SCROLL INDICATOR ================= */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 h-56 w-px bg-white/10">
        <motion.div
          style={{ height }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="w-px bg-[#4F8CFF]"
        />
      </div>

      {/* ================= ABOUT OVERVIEW ================= */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-sm tracking-[0.3em] text-gray-400"
        >
          ABOUT
        </motion.p>

        <motion.h1
          ref={headingRef}
          className="text-4xl md:text-5xl font-extrabold mt-6"
        >
          <DecryptedText text="Observe" start={startDecrypt} />
          <span className="mx-2">.</span>
          <DecryptedText text="Model" start={startDecrypt} />
          <span className="mx-2">.</span>
          <DecryptedText text="Refine" start={startDecrypt} />
          <span className="mx-2">.</span>
          <DecryptedText text="Repeat" start={startDecrypt} />
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-10 text-gray-400 leading-loose"
        >
          I’m an ML Engineer and a Computer Engineering student (B.E., 6th
          semester), focused on building intelligent systems that perform reliably
          beyond controlled environments. Rather than concentrating solely on
          model accuracy, I prioritize understanding data behavior, system
          stability, and real-world performance. My work is driven by a
          research-oriented mindset, strong engineering discipline, and
          continuous experimentation to deliver solutions that are robust,
          interpretable, and practically deployable.
        </motion.p>
      </motion.div>

      {/* ================= EDUCATION ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-16">
          <GraduationCap size={26} />
          <h2 className="text-3xl font-bold">Education</h2>
        </div>

        <div className="relative overflow-x-auto pb-16">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="origin-left absolute top-6 left-0 w-full h-px bg-white/20"
          />

          <div className="relative flex justify-between min-w-[1200px] gap-24">
            {journey.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.6 }}
                className="max-w-xs"
              >
                <div
                  className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center mb-8
                  ${
                    item.current
                      ? "border-2 border-[#4F8CFF] shadow-[0_0_28px_rgba(79,140,255,0.45)]"
                      : "border border-white/30"
                  } bg-[#0B0F1A]`}
                >
                  <GraduationCap size={20} />
                </div>

                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{item.year}</p>

                <div className="mt-5 space-y-1 text-sm text-gray-300">
                  <p>{item.institute}</p>
                  <p className="text-gray-400">{item.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
