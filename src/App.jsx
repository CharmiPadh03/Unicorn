import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-(--bg-main) text-white">
      <ScrollProgress />
      <Navbar />

      {/* Particle animation will be inside Hero */}
      <Hero />

      <About />
      <Skills />
      <Projects />
      <Contact />

      <Footer />
    </div>
  );
}
