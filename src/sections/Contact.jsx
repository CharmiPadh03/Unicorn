import { motion } from "framer-motion";
import {
  Linkedin,
  Github,
  Mail,
  GraduationCap,
  MapPin,
  Fingerprint,
  Instagram,
} from "lucide-react";

/* ================= ANIMATIONS ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

/* ================= COMPONENT ================= */

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-(--bg-main) text-white py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(255,255,255,0.06),transparent_40%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="text-xl">↗</span>
          <h2 className="text-2xl font-semibold">Connect With Me</h2>
        </motion.div>

        <div className="h-px w-full bg-white/10 mb-20" />

        {/* ICON ROW */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center gap-28 mb-28 flex-wrap"
        >
          <BrandCircle
            icon={<Linkedin size={32} />}
            title="LinkedIn"
            subtitle="linkedin.com/in/charmi-padh"
            href="https://www.linkedin.com/in/charmi-padh"
            color="#0A66C2"
          />

          <GithubCircle
            icon={<Github size={32} />}
            title="GitHub"
            subtitle="github.com/CharmiPadh03"
            href="https://github.com/CharmiPadh03"
          />

          <BrandCircle
            icon={<Instagram size={32} />}
            title="Instagram"
            subtitle="instagram.com/charmi.padh"
            href="https://www.instagram.com/charmi.padh"
            color="#E1306C"
          />

          <BrandCircle
            icon={<GraduationCap size={32} />}
            title="Google Scholar"
            subtitle="Charmi Padh"
            href="https://scholar.google.com/citations?user=v6bOJ5wAAAAJ&hl=en&oi=ao"
            color="#4285F4"
          />

          <BrandCircle
            icon={<Fingerprint size={32} />}
            title="ORCID iD"
            subtitle="0009-0009-0701-955X"
            href="https://orcid.org/0009-0009-0701-955X"
            color="#A6CE39"
          />
        </motion.div>

        {/* CONTACT INFO */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <Mail size={20} />
          <h2 className="text-2xl font-semibold">Contact Information</h2>
        </motion.div>

        <div className="h-px w-full bg-white/10 mb-16" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
          <InfoCard
            icon={<Mail />}
            title="Email"
            value="charmi.padh030206@gmail.com"
          />

          <InfoCard
            icon={<MapPin />}
            title="Location"
            value="Gandhinagar, Gujarat, India"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ================= ICONS ================= */

/* Brand slide fill */
function BrandCircle({ icon, title, subtitle, href, color }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="flex flex-col items-center text-center group"
    >
      <div
        className="relative w-24 h-24 rounded-full border-2 overflow-hidden
                   flex items-center justify-center"
        style={{ borderColor: color }}
      >
        <div
          className="absolute inset-0 translate-y-full
                     transition-transform duration-500
                     ease-[cubic-bezier(0.16,1,0.3,1)]
                     group-hover:translate-y-0"
          style={{ backgroundColor: color }}
        />

        <div
          className="relative z-10 transition-colors duration-300"
          style={{ color }}
        >
          <div className="group-hover:text-white transition-colors duration-300">
            {icon}
          </div>
        </div>
      </div>

      <p className="mt-4 font-medium">{title}</p>
      <p className="text-xs text-(--text-muted) mt-1">{subtitle}</p>
    </motion.a>
  );
}

/* GitHub: white → transparent white */
function GithubCircle({ icon, title, subtitle, href }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="flex flex-col items-center text-center group"
    >
      <div
        className="relative w-24 h-24 rounded-full border-2 border-white
                   flex items-center justify-center
                   transition-all duration-300
                   group-hover:border-white/60
                   group-hover:bg-white/10"
      >
        <div className="relative z-10 text-white transition-colors duration-300 group-hover:text-white/80">
          {icon}
        </div>
      </div>

      <p className="mt-4 font-medium">{title}</p>
      <p className="text-xs text-(--text-muted) mt-1">{subtitle}</p>
    </motion.a>
  );
}

/* ================= INFO CARD ================= */

function InfoCard({ icon, title, value }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="flex items-center gap-6 p-6 rounded-2xl
                 bg-white/5 border border-white/10
                 transition hover:bg-white/10"
    >
      <div
        className="w-12 h-12 rounded-full bg-(--accent)/15
                   text-(--accent)
                   flex items-center justify-center"
      >
        {icon}
      </div>

      <div>
        <p className="text-sm text-(--text-muted)">{title}</p>
        <p className="font-medium">{value}</p>
      </div>
    </motion.div>
  );
}
