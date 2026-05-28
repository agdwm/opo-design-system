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

function openMobileNav() {
  if (!menuButton || !mobileNav || !overlay) return;

  menuButton.setAttribute("aria-expanded", "true");
  menuButton.classList.add(transitionClass);

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

  mobileNav.classList.remove(transitionClass);
  overlay.classList.remove(transitionClass);

  mobileNav.addEventListener(
    "transitionend",
    () => {
      mobileNav.hidden = true;
      overlay.hidden = true;
      menuButton.focus();
    },
    { once: true },
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
