document.addEventListener("DOMContentLoaded", () => {
    initializeCarousel();
    setupSearchExpansion();
  
    // Iniciar la cuenta regresiva en cada oferta
    startCountdown("offerCountdown1", 10800); // 3 horas = 10800 segundos
    startCountdown("offerCountdown2", 14400); // 4 horas = 14400 segundos
    startCountdown("offerCountdown3", 18000); // 5 horas = 18000 segundos
    startCountdown("offerCountdown4", 21600); // 6 horas = 21600 segundos
  
    setupSmoothScroll();
  });

function initializeCarousel() {
  const carouselElement = document.querySelector("#carouselExampleIndicators");
  if (carouselElement) {
    new bootstrap.Carousel(carouselElement, {
      interval: 3000,
      wrap: true,
    });
  }
}

function startCountdown(elementId, duration) {
  const countdownElement = document.getElementById(elementId);
  if (!countdownElement) {
    console.error(`Elemento con id ${elementId} no encontrado`);
    return;
  }

  let countdownTime = duration;

  const interval = setInterval(() => {
    if (countdownTime <= 0) {
      clearInterval(interval);
      countdownElement.textContent = "¡Oferta expirada!";
      countdownElement.classList.remove("text-danger");
      countdownElement.classList.add("text-muted");
      return;
    }

    const hours = Math.floor(countdownTime / 3600);
    const minutes = Math.floor((countdownTime % 3600) / 60);
    const seconds = countdownTime % 60;

    countdownElement.textContent = `¡Oferta termina en ${hours}h ${minutes}m ${seconds}s!`;
    countdownTime--;
  }, 1000);
}

function setupSearchExpansion() {
  const searchInput = document.querySelector(".form-control");

  if (searchInput) {
    searchInput.addEventListener("focus", () => {
      searchInput.style.width = "300px";
    });

    searchInput.addEventListener("blur", () => {
      searchInput.style.width = "250px";
    });
  }
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
