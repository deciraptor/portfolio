// scrollFunction Header

const header = document.getElementById("mainHeader");
const MOBILE_BREAKPOINT = 1024;

function updateHeaderBg() {
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  const scrolled = window.scrollY > 50;

  if (isMobile || scrolled) {
    // Sur mobile, ou desktop scrollé (>50px) → fond et bord
    header.style.backgroundColor = "#191919";
    header.style.borderBottom = "1px solid #0f9874";
  } else {
    // Desktop non-scrolled → transparent
    header.style.backgroundColor = "transparent";
    header.style.borderBottom = "none";
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


// scroll spy 

const links = Array.from(document.querySelectorAll("#mainNavbar .nav-link"));
const sections = links.map(a =>
  document.querySelector(a.getAttribute("href"))
);

function updateActive() {
  const offset = 63; // même valeur que data-bs-offset
  const scrollPos = window.scrollY + offset;
  // on prend la section dont le milieu est le plus proche de scrollPos
  let idx = sections.findIndex((sec, i) => {
    const rect = sec.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const bottom = top + rect.height;
    return scrollPos >= top && scrollPos < bottom;
  });
  if (idx === -1) {
    // si on est tout en haut, on enlève tous
    links.forEach(a => a.classList.remove("active"));
    return;
  }
  links.forEach(a => a.classList.toggle("active",
    a.getAttribute("href") === `#${sections[idx].id}`));
}

window.addEventListener("scroll", updateActive, { passive: true });
updateActive();


// form 

const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          form.reset();
          success.classList.remove('d-none');
        } else {
          alert("Une erreur est survenue. Merci de réessayer ou d'envoyer un email directement.");
        }
      })
      .catch(() => {
        alert("Une erreur est survenue. Merci de réessayer ou d'envoyer un email directement.");
      });
  });
}

// bouton focus

document.addEventListener('DOMContentLoaded', function () {
  // ... ton autre JS ici ...

  // Focus sur le champ Prénom au clic du bouton
  const focusBtn = document.getElementById('focus-prenom');
  const prenomInput = document.getElementById('prenom');
  if (focusBtn && prenomInput) {
    focusBtn.addEventListener('click', function () {
      prenomInput.focus();
      // Pour les lecteurs d'écran/accessibilité, scroll dans le formulaire si besoin :
      prenomInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
});
