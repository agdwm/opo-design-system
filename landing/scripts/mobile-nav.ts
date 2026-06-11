/* ==========================================================
   Mobile navigation
========================================================== */

const menuButton = document.querySelector<HTMLButtonElement>(
  ".landing-header__menu-button",
);

const closeButton =
  document.querySelector<HTMLButtonElement>(".mobile-nav__close");

const mobileNav = document.querySelector<HTMLElement>("#mobile-navigation");

const overlay = document.querySelector<HTMLElement>("#mobile-nav-overlay");

const transitionClass = "is-open";
const bodyOpenClass = "has-mobile-nav-open";
/* Safety timeout used if `transitionend` does not fire (prefers-reduced-motion).
Slightly longer than the CSS drawer transition. */
const fallbackTransitionDuration = 350;

let closeFallbackTimer: number | undefined;

function setMobileNavHidden() {
  if (!menuButton || !mobileNav || !overlay) return;

  mobileNav.hidden = true;
  overlay.hidden = true;
  // Return focus to the button that opened the menu.
  menuButton.focus();

  // If there was a pending close fallback, cancel it.
  // This prevents bugs if the user opens/closes quickly.
  window.clearTimeout(closeFallbackTimer);
  closeFallbackTimer = undefined;
}

function openMobileNav() {
  if (!menuButton || !mobileNav || !overlay) return;

  window.clearTimeout(closeFallbackTimer);

  // Communicate to assistive technologies that the button now controls an expanded content
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.classList.add(transitionClass);

  document.body.classList.add(bodyOpenClass);

  mobileNav.hidden = false;
  overlay.hidden = false;

  /* Wait one frame so the browser can register the closed state
  before animating to .is-open.*/
  requestAnimationFrame(() => {
    mobileNav.classList.add(transitionClass);
    overlay.classList.add(transitionClass);
    closeButton?.focus();
  });
}

function closeMobileNav() {
  if (!menuButton || !mobileNav || !overlay) return;

  menuButton.setAttribute("aria-expanded", "false");
  // devuelve el icono butón a su estado cerrado (hamburger)
  menuButton.classList.remove(transitionClass);

  document.body.classList.remove(bodyOpenClass);

  mobileNav.classList.remove(transitionClass);
  overlay.classList.remove(transitionClass);

  mobileNav.addEventListener(
    /* Event that the browser triggers when a CSS transition ends
    when close animation ends, `hidden` is set to true */
    "transitionend",
    (event) => {
      if (event.target !== mobileNav) return;

      setMobileNavHidden();
    },
    //the listener is automatically removed after it runs once, which prevents bugs if the user opens/closes quickly
    { once: true },
  );

  /* Fallback: only if `transitionend` does not fire (prefers-reduced-motion),
   ensure the drawer is still hidden. */
  closeFallbackTimer = window.setTimeout(
    setMobileNavHidden,
    fallbackTransitionDuration,
  );
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    closeMobileNav();
  } else {
    openMobileNav();
  }
});

closeButton?.addEventListener("click", closeMobileNav);

overlay?.addEventListener("click", closeMobileNav);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileNav();
  }
});
