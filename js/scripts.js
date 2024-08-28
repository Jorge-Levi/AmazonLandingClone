document.addEventListener("DOMContentLoaded", () => {
    const carouselElement = document.querySelector('#carouselExampleIndicators');
    new bootstrap.Carousel(carouselElement, {
        interval: 3000,  // 3000 ms = 3 segundos entre transiciones
        ride: 'carousel', // El carrusel empieza automáticamente
        wrap: true        // El carrusel continúa al llegar al final
    });
});



function startCountdown(elementId, duration) {
    var countdownElement = document.getElementById(elementId);
    var countdownTime = duration;
    
    var interval = setInterval(function () {
        var hours = Math.floor(countdownTime / 3600);
        var minutes = Math.floor((countdownTime % 3600) / 60);
        var seconds = countdownTime % 60;

        countdownElement.textContent = `¡Oferta termina en ${hours}h ${minutes}m ${seconds}s!`;

        if (countdownTime <= 0) {
            clearInterval(interval);
            countdownElement.textContent = "¡Oferta expirada!";
        } else {
            countdownTime--;
        }
    }, 1000);
}

// Iniciar la cuenta regresiva en las ofertas del día
document.addEventListener("DOMContentLoaded", function () {
    startCountdown("offerCountdown1", 10800); // 3 horas = 10800 segundos
    // Puedes repetir para otras ofertas si es necesario
});

document.addEventListener("DOMContentLoaded", function () {
    var searchInput = document.querySelector('.form-control');

    searchInput.addEventListener('focus', function () {
        this.style.width = "300px"; // Ancho expandido
        this.style.transition = "width 0.3s ease-in-out";
    });

    searchInput.addEventListener('blur', function () {
        this.style.width = "250px"; // Ancho original
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
