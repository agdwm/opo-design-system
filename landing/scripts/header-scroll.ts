const header = document.querySelector<HTMLElement>(".landing-header");

const scrollThreshold = 16; // 16px, equivalent to the padding of the header
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
