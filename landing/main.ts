import "../src/stylesheets/global.css";
import "./styles/landing.css";

import logo from "./assets/img/logo.svg?raw";
import logoSmall from "./assets/img/logo-small.svg?raw";

import "../dist/landing-challenge/landing-challenge.esm.js";

const logoQuery = window.matchMedia("(width >= 768px)");

function renderLogo() {
  const currentLogo = logoQuery.matches ? logo : logoSmall;

  document.querySelectorAll(".landing-logo").forEach((logoContainer) => {
    logoContainer.innerHTML = currentLogo;
  });
}

renderLogo();

logoQuery.addEventListener("change", renderLogo);
