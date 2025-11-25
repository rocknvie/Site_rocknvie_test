document.addEventListener("DOMContentLoaded", () => {
  const groups = document.querySelectorAll(".group");

  groups.forEach(group => {
    const hoverText = group.querySelector(".hover-text");
    const baseImg = group.querySelector("img");
    let slideElems = Array.from(group.querySelectorAll(".slideshow .slide"));
    let intervalId = null;
    let current = 0;

    // Affiche une slide
    function showSlide(i) {
      slideElems.forEach(el => el.style.display = "none");
      slideElems[i].style.display = "block";
    }

    // Passe à la slide suivante
    function nextSlide() {
      current = (current + 1) % slideElems.length;
      showSlide(current);
    }

    function start() {
      if (!slideElems.length || intervalId) return;

      if (hoverText) hoverText.style.display = "none";
      if (baseImg) baseImg.style.display = "none";

      // Affiche immédiatement la première image
      current = 0;
      showSlide(current);

      // Affiche directement la deuxième image si elle existe
      if (slideElems.length > 1) nextSlide();

      // Démarre le cycle toutes les 2 secondes
      intervalId = setInterval(nextSlide, 2000);
    }

    function stop() {
      if (intervalId) clearInterval(intervalId);
      intervalId = null;

      slideElems.forEach(el => el.style.display = "none");
      if (baseImg) baseImg.style.display = "";
      if (hoverText) hoverText.style.display = "block";
    }

    // Événements desktop
    group.addEventListener("mouseenter", start);
    group.addEventListener("mouseleave", stop);

    // Événements mobile
    group.addEventListener("touchstart", start, { passive: true });
    group.addEventListener("touchend", () => setTimeout(stop, 300));
  });

  // --- Fade-in des éléments ---
  const fadeElems = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  fadeElems.forEach(el => observer.observe(el));
});
