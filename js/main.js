// scrollFunction Header

const header = document.getElementById("mainHeader");
const MOBILE_BREAKPOINT = 1024;

function updateHeaderBg() {
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  const scrolled   = window.scrollY > 50;

  if (isMobile || scrolled) {
    // Sur mobile, ou desktop scrollé (>50px) → fond et bord
    header.style.backgroundColor = "#191919";
    header.style.borderBottom    = "1px solid #0f9874";
  } else {
    // Desktop non-scrolled → transparent
    header.style.backgroundColor = "transparent";
    header.style.borderBottom    = "none";
  }
}

// Écouteurs pour scroll, resize et chargement initial
window.addEventListener("scroll", updateHeaderBg);
window.addEventListener("resize", updateHeaderBg);
window.addEventListener("DOMContentLoaded", updateHeaderBg);

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
      <img src="${src}" loading="lazy" class="d-block w-100" alt="Slide ${i + 1}">
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

