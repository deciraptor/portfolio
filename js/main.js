// scrollFunction Header

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("mainHeader").style.backgroundColor = "#191919";
    document.getElementById("mainHeader").style.borderBottom = "1px solid #19c79a";

  } else {
    document.getElementById("mainHeader").style.backgroundColor = "transparent";
    document.getElementById("mainHeader").style.borderBottom = "none";

  }
}

// carrousel 

const modalEl = document.getElementById('carouselModal');

modalEl.addEventListener('show.bs.modal', event => {
  // le bouton / image qui a déclenché l'ouverture
  const trigger = event.relatedTarget;
  // on récupère et parse le tableau d'URLs
  const images = JSON.parse(trigger.getAttribute('data-images') || '[]');
  const inner = modalEl.querySelector('.carousel-inner');

  // on vide et on recrée les .carousel-item
  inner.innerHTML = images.map((src, i) => `
    <div class="carousel-item ${i === 0 ? 'active' : ''}">
      <img src="${src}" class="d-block w-100" alt="Slide ${i + 1}">
    </div>
  `).join('');
});

// scroll AOS 

document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    once: true,            // L’animation ne se joue qu’une fois
    duration: 800,         // Durée des animations
    easing: 'ease-in-out'  // Effet de transition
  });
});

