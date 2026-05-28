/* ==========================================================
   Mobile navigation
========================================================== */

const menuButton = document.querySelector<HTMLButtonElement>(
  ".landing-header__menu-button",
);

const closeButton =
  document.querySelector<HTMLButtonElement>(".mobile-nav__close");

const mobileNav = document.querySelector<HTMLElement>("#mobile-navigation");

const overlay = document.querySelector<HTMLElement>(".mobile-nav-overlay");

const transitionClass = "is-open";
const bodyOpenClass = "has-mobile-nav-open";
const fallbackTransitionDuration = 350;

let closeFallbackTimer: number | undefined;

function setMobileNavHidden() {
  if (!menuButton || !mobileNav || !overlay) return;

  mobileNav.hidden = true;
  overlay.hidden = true;
  menuButton.focus();

  window.clearTimeout(closeFallbackTimer);
  closeFallbackTimer = undefined;
}

function openMobileNav() {
  if (!menuButton || !mobileNav || !overlay) return;

  window.clearTimeout(closeFallbackTimer);

  menuButton.setAttribute("aria-expanded", "true");
  menuButton.classList.add(transitionClass);

  document.body.classList.add(bodyOpenClass);

  mobileNav.hidden = false;
  overlay.hidden = false;

  requestAnimationFrame(() => {
    mobileNav.classList.add(transitionClass);
    overlay.classList.add(transitionClass);
  });
}

function closeMobileNav() {
  if (!menuButton || !mobileNav || !overlay) return;

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.classList.remove(transitionClass);

  document.body.classList.remove(bodyOpenClass);

  mobileNav.classList.remove(transitionClass);
  overlay.classList.remove(transitionClass);

  mobileNav.addEventListener(
    "transitionend",
    (event) => {
      if (event.target !== mobileNav) return;

      setMobileNavHidden();
    },
    { once: true },
  );

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
