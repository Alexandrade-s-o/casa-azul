// Aparición progresiva de secciones al hacer scroll (efecto "se va dibujando")
const reveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        reveal.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".card, .post, .frame, .agenda-list li, .section-head").forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = `opacity 0.6s ease ${(i % 6) * 0.07}s, transform 0.6s ease ${(i % 6) * 0.07}s`;
  reveal.observe(el);
});

// Resaltado del enlace de navegación activo según la sección visible
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((a) => {
          a.style.color = a.getAttribute("href") === `#${id}` ? "var(--yellow)" : "";
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => spy.observe(s));
