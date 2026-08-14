import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-(--bg-main) text-white">
      <ScrollProgress />
      <Navbar />

      {/* Hero (particle animation inside) */}
      <Hero />

      {/* Core sections */}
      <About />
      <Skills />

      {/* NEW: Experience */}
      <Experience />

      {/* Projects */}
      <Projects />

      {/* NEW: Achievements */}
      <Achievements />

      {/* Contact */}
      <Contact />

      <Footer />
    </div>
  );
}
