document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const siteHeader = document.getElementById("siteHeader");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  window.addEventListener("load", () => {
    setTimeout(() => preloader.classList.add("hide"), 450);
  });

  const handleHeader = () => {
    if (window.scrollY > 40) siteHeader.classList.add("scrolled");
    else siteHeader.classList.remove("scrolled");
  };

  handleHeader();
  window.addEventListener("scroll", handleHeader);

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  const parallaxCard = document.querySelector(".parallax-card");
  if (parallaxCard) {
    window.addEventListener("mousemove", (event) => {
      if (window.innerWidth < 900) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 12;
      parallaxCard.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  const testimonials = Array.from(document.querySelectorAll(".testimonial"));
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");
  let currentTestimonial = 0;

  const showTestimonial = (index) => {
    testimonials.forEach((testimonial) => testimonial.classList.remove("active"));
    testimonials[index].classList.add("active");
  };

  if (testimonials.length && prevBtn && nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    });

    prevBtn.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentTestimonial);
    });

    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 6500);
  }

  const escapeSvgText = (text) => String(text || "Image à remplacer")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  const makePlaceholder = (label) => {
    const text = escapeSvgText(label);
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#171717"/>
            <stop offset="52%" stop-color="#2a2116"/>
            <stop offset="100%" stop-color="#d9b37f"/>
          </linearGradient>
          <radialGradient id="r" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#e6c875" stop-opacity="0.38"/>
            <stop offset="100%" stop-color="#e6c875" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1200" height="900" fill="url(#g)"/>
        <rect width="1200" height="900" fill="url(#r)"/>
        <path d="M380 238 C420 145 520 115 600 160 C680 115 780 145 820 238 C905 270 940 350 902 430 C956 520 920 632 820 662 C780 755 680 785 600 740 C520 785 420 755 380 662 C280 632 244 520 298 430 C260 350 295 270 380 238Z" fill="none" stroke="#e6c875" stroke-width="7" opacity="0.75"/>
        <text x="600" y="430" text-anchor="middle" font-family="Georgia, serif" font-size="56" fill="#fff8e8">Le Palais de la Beauté</text>
        <text x="600" y="500" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="#ead4ad">${text}</text>
        <text x="600" y="560" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#f7f2e7" opacity="0.75">Remplacez cette image dans le dossier /assets</text>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      const label = img.dataset.fallback || img.alt || "Image à remplacer";
      img.src = makePlaceholder(label);
      img.classList.add("image-placeholder");
    });
  });
});
