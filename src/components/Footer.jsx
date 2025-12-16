export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 text-center text-sm text-(--text-muted) py-6">
      <div className="container-max">
        © {new Date().getFullYear()} Charmi Padh · All rights reserved
      </div>
    </footer>
  );
}
