// scrollFunction Header

const header = document.getElementById("mainHeader");
const MOBILE_BREAKPOINT = 1024;

function updateHeaderBg() {
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  const scrolled = window.scrollY > 50;

  if (isMobile || scrolled) {
    // Sur mobile, ou desktop scrollé (>50px) → fond et bord
    header.style.backgroundColor = "#191919";
    header.style.borderBottom = "1px solid #4d79ff";
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

document.addEventListener("DOMContentLoaded", function () {
  const boutonMail = document.getElementById("focus-prenom");
  const formulaire = document.getElementById("formulaire-contact");
  const inputPrenom = document.getElementById("prenom");

  boutonMail.addEventListener("click", function () {
    if (formulaire.classList.contains("d-none")) {
      // Affiche et focus
      formulaire.classList.remove("d-none");
      formulaire.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        inputPrenom.focus();
      }, 200);
    } else {
      // Masque le formulaire
      formulaire.classList.add("d-none");
    }
  });
});

// scroll-spy

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#mainNavbar .nav-link');

  function onScroll() {


    let found = false;
    const atBottom = (window.innerHeight + window.pageYOffset) >= (document.documentElement.scrollHeight - 2);

    if (atBottom) {
      navLinks.forEach(link => link.classList.remove('active'));
      const contactLink = document.querySelector('#mainNavbar .nav-link[href="#contact"]');
      if (contactLink) contactLink.classList.add('active');
      found = true;
    } else {
      let currentSection = null;
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.25 && rect.bottom > window.innerHeight * 0.25) {
          currentSection = section;
        }
      });
      navLinks.forEach(link => link.classList.remove('active'));
      if (currentSection) {
        const id = currentSection.getAttribute('id');
        const activeLink = document.querySelector(`#mainNavbar .nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
        found = true;
      }
    }
    if (!found) navLinks.forEach(link => link.classList.remove('active'));
  }

  window.addEventListener('scroll', onScroll);
  onScroll();
});

