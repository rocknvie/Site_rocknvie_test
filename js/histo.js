document.addEventListener("DOMContentLoaded", () => {
  const groups = document.querySelectorAll(".group");

  // --- Préchargement immédiat de la première image de chaque groupe ---
  groups.forEach(group => {
    const firstSlide = group.querySelector(".slideshow .slide");
    if (firstSlide) {
      const imgPreload = new Image();
      imgPreload.src = firstSlide.src;
      // Affiche la première image directement
      firstSlide.style.display = "block";
    }
  });

  groups.forEach(group => {
    const hoverText = group.querySelector(".hover-text");
    const baseImg = group.querySelector("img");
    let slideElems = Array.from(group.querySelectorAll(".slideshow .slide"));
    let intervalId = null;
    let current = 0;

    // --- Préchargement du reste des images ---
    slideElems.slice(1).forEach(slide => {
      const img = new Image();
      img.src = slide.src;
      slide.style.display = "none";
    });

    function showSlide(i) {
      slideElems.forEach(el => el.style.display = "none");
      slideElems[i].style.display = "block";
    }

    function nextSlide() {
      current = (current + 1) % slideElems.length;
      showSlide(current);
    }

    function start() {
      if (!slideElems.length || intervalId) return;

      if (hoverText) hoverText.style.display = "none";
      if (baseImg) baseImg.style.display = "none";

      current = 0;
      showSlide(current);

      if (slideElems.length > 1) nextSlide();

      intervalId = setInterval(nextSlide, 2000);
    }

    function stop() {
      if (intervalId) clearInterval(intervalId);
      intervalId = null;

      slideElems.forEach(el => el.style.display = "none");
      if (baseImg) baseImg.style.display = "";
      if (hoverText) hoverText.style.display = "block";
    }

    group.addEventListener("mouseenter", start);
    group.addEventListener("mouseleave", stop);

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
