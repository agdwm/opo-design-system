const header = document.querySelector<HTMLElement>(".landing-header");

const scrollThreshold = header?.offsetHeight ?? 72;
const bodyOpenClass = "has-mobile-nav-open";

function isMobileNavOpen() {
  return document.body.classList.contains(bodyOpenClass);
}

function updateHeaderState() {
  if (!header || isMobileNavOpen()) return;

  header.classList.toggle("is-scrolled", window.scrollY > scrollThreshold);
}

updateHeaderState();

window.addEventListener("scroll", updateHeaderState, { passive: true });
window.addEventListener("resize", updateHeaderState, { passive: true });

// Forces TypeScript to treat this file as an ES module
// and prevents variables from leaking into the global scope.
export {};
