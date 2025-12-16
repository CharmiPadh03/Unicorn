import { Home, BrainCircuit, FolderKanban, Sparkles, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  /* --- INTERSECTION OBSERVER (accurate scroll spy) --- */
  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="
        fixed top-6 left-1/2 -translate-x-1/2
        w-[88%] md:w-[65%] rounded-2xl px-7 py-4
        bg-[rgba(0,12,40,0.45)] backdrop-blur-xl
        border border-white/10 shadow-md z-50
        navbar-load       /* ← ADDED LOAD ANIMATION */
      "
    >
      <div className="flex justify-between items-center">

        {/* BRAND NAME */}
        <h1
          className="text-xl tracking-wide font-extrabold"
          style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "2px" }}
        >
          CHARMI PADH
        </h1>

        {/* NAV ITEMS */}
        <ul className="flex items-center gap-7">

          <NavItem label="Home" href="#home" icon={<Home />}
            active={activeSection === "home"} anim="pulse" />

          <NavItem label="About" href="#about" icon={<Sparkles />}
            active={activeSection === "about"} anim="glow" />

          <NavItem label="Skills" href="#skills" icon={<BrainCircuit />}
            active={activeSection === "skills"} anim="rotate" />

          <NavItem label="Projects" href="#projects" icon={<FolderKanban />}
            active={activeSection === "projects"} anim="sparkle" />

          <NavItem label="Contact" href="#contact" icon={<Mail />}
            active={activeSection === "contact"} anim="bounce" />

        </ul>
      </div>
    </nav>
  );
}


/* --- NavItem Component --- */
function NavItem({ href, label, icon, active, anim }) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center gap-2 text-sm transition-all duration-300"
      >
        {/* ICON (active → animation | inactive → muted) */}
        <span
          className={
            active
              ? `icon-${anim}-active`
              : "nav-icon-inactive"
          }
          style={{ color: active ? "#A56BFF" : "var(--text-muted)" }}
        >
          {icon}
        </span>

        {/* LABEL (active → purple) */}
        <span className={active ? "nav-active-label" : "nav-label"}>
          {label}
        </span>
      </a>
    </li>
  );
}
