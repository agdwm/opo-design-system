const header = document.querySelector<HTMLElement>(".landing-header");

const bodyOpenClass = "has-mobile-nav-open";

function isMobileNavOpen() {
  return document.body.classList.contains(bodyOpenClass);
}

function getScrollThreshold() {
  return header?.offsetHeight ?? 72;
}

function updateHeaderState() {
  /* If the mobile menu is open, do not modify the header state.
  This prevents scroll from interfering with the mobile menu's visual state. */
  if (!header || isMobileNavOpen()) return;

  header.classList.toggle("is-scrolled", window.scrollY > getScrollThreshold());
}

updateHeaderState();

window.addEventListener("scroll", updateHeaderState, {
  // Improves scroll performance by telling the browser
  // js will not cancel the scroll event calling to preventDefault(),
  passive: true,
});

window.addEventListener("resize", updateHeaderState, {
  passive: true,
});

// Converts the file into a module to prevent variables like header or bodyOpenClass from being globally available in the window object, which could cause conflicts with other scripts.
export {};
