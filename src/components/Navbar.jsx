import {
  BrainCircuit,
  FolderKanban,
  Sparkles,
  Mail,
  Briefcase,
  Trophy,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = [
      "home",
      "about",
      "skills",
      "experience",
      "projects",
      "achievements",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
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
        w-[95%] md:w-[80%]
        rounded-2xl px-8 py-4
        bg-[rgba(0,12,40,0.55)] backdrop-blur-xl
        border border-white/10 shadow-lg z-50
        navbar-load
      "
    >
      <div className="flex justify-between items-center">
        {/* BRAND → GOES TO HOME */}
        <a
          href="#home"
          className="text-xl md:text-2xl font-extrabold tracking-widest cursor-pointer"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          CHARMI PADH
        </a>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-8">
          <NavItem
            label="About"
            href="#about"
            icon={<Sparkles size={20} />}
            active={activeSection === "about"}
            anim="glow"
          />

          <NavItem
            label="Skills"
            href="#skills"
            icon={<BrainCircuit size={20} />}
            active={activeSection === "skills"}
            anim="rotate"
          />

          <NavItem
            label="Experience"
            href="#experience"
            icon={<Briefcase size={20} />}
            active={activeSection === "experience"}
            anim="slide"
          />

          <NavItem
            label="Projects"
            href="#projects"
            icon={<FolderKanban size={20} />}
            active={activeSection === "projects"}
            anim="sparkle"
          />

          <NavItem
            label="Achievements"
            href="#achievements"
            icon={<Trophy size={20} />}
            active={activeSection === "achievements"}
            anim="trophy"
          />

          <NavItem
            label="Contact"
            href="#contact"
            icon={<Mail size={20} />}
            active={activeSection === "contact"}
            anim="bounce"
          />
        </ul>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <ul className="md:hidden mt-6 flex flex-col gap-4 animate-slideDown">
          {[
            ["About", "#about"],
            ["Skills", "#skills"],
            ["Experience", "#experience"],
            ["Projects", "#projects"],
            ["Achievements", "#achievements"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 rounded-lg text-base transition
                  ${
                    activeSection === href.replace("#", "")
                      ? "text-[#A56BFF]"
                      : "text-(--text-muted)"
                  }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

/* ================= NAV ITEM ================= */

function NavItem({ href, label, icon, active, anim }) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center gap-3 text-base transition-all duration-300"
      >
        <span
          className={active ? `icon-${anim}-active` : "nav-icon-inactive"}
          style={{ color: active ? "#A56BFF" : "var(--text-muted)" }}
        >
          {icon}
        </span>

        <span
          className={`${
            active ? "nav-active-label" : "nav-label"
          } text-[1.05rem]`}
        >
          {label}
        </span>
      </a>
    </li>
  );
}
