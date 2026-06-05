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

/* ── Edificio que se dibuja con el scroll ───────────────────────── */
(function () {
  const svg = document.querySelector(".draw-stroke");
  if (!svg) return;

  const sig = svg.querySelector(".signature");
  const items = Array.from(
    svg.querySelectorAll("path, rect, line, circle")
  ).map((el) => {
    let len = 0;
    try { len = el.getTotalLength(); } catch (e) { len = 0; }
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
    return { el, len };
  });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    items.forEach((it) => (it.el.style.strokeDashoffset = 0));
    if (sig) sig.style.opacity = 1;
    return;
  }

  const N = items.length;
  let ticking = false;

  function paint() {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, window.scrollY / max) : 1;

    items.forEach((it, i) => {
      // cada trazo se dibuja dentro de su tramo de scroll (con solape suave)
      const start = (i / N) * 0.9;
      const span = (1 / N) * 2.4;
      let local = (p - start) / span;
      local = Math.max(0, Math.min(1, local));
      it.el.style.strokeDashoffset = it.len * (1 - local);
    });

    if (sig) sig.style.opacity = p > 0.72 ? 1 : 0;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(paint);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", paint);
  paint();
})();
