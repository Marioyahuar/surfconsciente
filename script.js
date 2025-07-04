const preloader = document.getElementById("preloader");
const landing = document.getElementById("landing");
const fondoImgs = ["img/fondo1.jpg", "img/fondo2.jpg", "img/fondo3.jpg"];

let current = 0;

const gif1 = document.getElementById("gif1");
const logo = document.getElementById("logoParpadeo");
const texto = document.getElementById("surfTexto");

function switchStep(fromEl, toEl, delay = 1500) {
  return new Promise((resolve) => {
    fromEl.classList.remove("visible");

    setTimeout(() => {
      // Asegura que el anterior se esconda completamente antes de mostrar el siguiente
      toEl.classList.add("visible");
      resolve();
    }, 600); // Esperamos a que se complete el fadeOut de 0.5s (500ms)
  });
}

window.addEventListener("load", async () => {
  const alreadyVisited = sessionStorage.getItem("visitedLanding");

  if (alreadyVisited) {
    preloader.style.display = "none";
    landing.classList.remove("hidden");
    updateBackground();
    return;
  }

  await new Promise((r) => setTimeout(r, 1500));
  await switchStep(gif1, logo);
  await new Promise((r) => setTimeout(r, 2500)); // esperar que termine la animación
  texto.classList.add("visible");
  await new Promise((r) => setTimeout(r, 1500));

  preloader.style.transition = "opacity 0.5s ease";
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
    landing.classList.remove("hidden");
    updateBackground();
    sessionStorage.setItem("visitedLanding", "true");
  }, 500);
});

// Cambiar fondo
const updateBackground = () => {
  landing.style.backgroundImage = `url(${fondoImgs[current]})`;
};

// Flechas
document.querySelector(".arrow.left").addEventListener("click", () => {
  current = (current - 1 + fondoImgs.length) % fondoImgs.length;
  updateBackground();
});

document.querySelector(".arrow.right").addEventListener("click", () => {
  current = (current + 1) % fondoImgs.length;
  updateBackground();
});

document.addEventListener("DOMContentLoaded", () => {
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");
  const hamburgerBtn = document.querySelector(".hamburger");

  // Abrir menú
  hamburgerBtn.addEventListener("click", () => {
    console.log("event added");
    menuOverlay.classList.add("visible");
  });

  // Cerrar menú
  menuClose.addEventListener("click", () => {
    menuOverlay.classList.remove("visible");
  });

  // Cerrar haciendo clic fuera del panel
  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
      menuOverlay.classList.remove("visible");
    }
  });
});
