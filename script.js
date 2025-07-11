const preloader = document.getElementById("preloader");
const landing = document.getElementById("landing");
const gif1 = document.getElementById("gif1");
const logo = document.getElementById("logoParpadeo");
const texto = document.getElementById("surfTexto");

const fondoImgs = ["img/fondo1.jpg", "img/fondo2.jpg", "img/fondo3.jpg"];
let current = 0;

// Cambio entre pasos del preloader
function switchStep(fromEl, toEl, delay = 1500) {
  return new Promise((resolve) => {
    fromEl.classList.remove("visible");

    setTimeout(() => {
      toEl.classList.add("visible");
      resolve();
    }, 600); // tiempo del fadeOut
  });
}

// Preloader solo en landing
window.addEventListener("load", async () => {
  const alreadyVisited = sessionStorage.getItem("visitedLanding");

  if (!preloader || !landing || !gif1 || !logo || !texto) return;

  if (alreadyVisited) {
    preloader.style.display = "none";
    landing.classList.remove("hidden");
    updateBackground();
    
    // Mostrar popup después de 1 segundo para visitantes recurrentes
    setTimeout(() => {
      showNewsletterPopup();
    }, 1000);
    return;
  }

  await new Promise((r) => setTimeout(r, 1500));
  await switchStep(gif1, logo);
  await new Promise((r) => setTimeout(r, 2500));
  texto.classList.add("visible");
  await new Promise((r) => setTimeout(r, 1500));

  preloader.style.transition = "opacity 0.5s ease";
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
    landing.classList.remove("hidden");
    updateBackground();
    sessionStorage.setItem("visitedLanding", "true");
    
    // Mostrar popup después de 1 segundo
    setTimeout(() => {
      showNewsletterPopup();
    }, 1000);
  }, 500);
});

// Cambiar fondo (landing)
const updateBackground = () => {
  if (landing) {
    landing.style.backgroundImage = `url(${fondoImgs[current]})`;
  }
};

// Flechas (solo si existen)
const arrowLeft = document.querySelector(".arrow.left");
const arrowRight = document.querySelector(".arrow.right");

if (arrowLeft && arrowRight && landing) {
  arrowLeft.addEventListener("click", () => {
    current = (current - 1 + fondoImgs.length) % fondoImgs.length;
    updateBackground();
  });

  arrowRight.addEventListener("click", () => {
    current = (current + 1) % fondoImgs.length;
    updateBackground();
  });
}

// Menú hamburguesa (todas las páginas)
document.addEventListener("DOMContentLoaded", () => {
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");
  const hamburgerBtn = document.querySelector(".hamburger");

  if (menuOverlay && menuClose && hamburgerBtn) {
    // Abrir menú
    hamburgerBtn.addEventListener("click", () => {
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
  }
});

// Función para mostrar el popup del newsletter
function showNewsletterPopup() {
  const popup = document.getElementById("newsletterPopup");
  if (popup) {
    popup.classList.remove("hidden");
    popup.classList.add("visible");
  }
}

// Funcionalidad del formulario del popup
document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const subscribeBtn = document.getElementById("subscribeBtn");
  const newsletterForm = document.getElementById("newsletterForm");
  const popupClose = document.getElementById("popupClose");
  const newsletterPopup = document.getElementById("newsletterPopup");

  if (nameInput && emailInput && subscribeBtn) {
    // Activar/desactivar botón según los inputs
    function toggleSubscribeButton() {
      const isValid = nameInput.value.trim() !== "" && emailInput.value.trim() !== "";
      subscribeBtn.disabled = !isValid;
    }

    nameInput.addEventListener("input", toggleSubscribeButton);
    emailInput.addEventListener("input", toggleSubscribeButton);

    // Manejar envío del formulario
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Aquí iría la lógica de envío del formulario
        console.log("Formulario enviado:", {
          name: nameInput.value,
          email: emailInput.value
        });
      });
    }
  }

  // Cerrar popup con el botón X
  if (popupClose && newsletterPopup) {
    popupClose.addEventListener("click", () => {
      newsletterPopup.classList.remove("visible");
      newsletterPopup.classList.add("hidden");
    });
  }
});
