export default function Contact() {
  return (
    <section id="contact" className="py-24 fade-up min-h-screen">
      <div className="container-max text-center">
        <h2 className="text-3xl font-bold mb-4">Contact</h2>

        <p className="text-(--text-muted) mb-6">
          Feel free to reach out!
        </p>

        <a
          href="mailto:your-email@gmail.com"
          className="px-8 py-3 bg-(--accent) rounded-md"
        >
          Email Me
        </a>
      </div>
    </section>
  );
}
