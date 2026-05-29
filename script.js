document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const header = document.getElementById("siteHeader");
  const hamburger = document.getElementById("hamburger");
  const mobilePanel = document.getElementById("mobilePanel");

  /* Preloader */
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hide");
    }, 500);
  });

  /* Header background on scroll */
  function updateHeader() {
    if (window.scrollY > 30) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader);

  /* Mobile sliding menu */
  function closeMenu() {
    hamburger.classList.remove("active");
    mobilePanel.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobilePanel.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  document.querySelectorAll(".mobile-panel a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  mobilePanel.addEventListener("click", (event) => {
    if (event.target === mobilePanel) closeMenu();
  });

  /* Scroll reveal animation */
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.13, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((item) => revealObserver.observe(item));

  /* Mobile service carousel active card + dots */
  const servicesTrack = document.getElementById("servicesTrack");
  const serviceCards = servicesTrack ? Array.from(servicesTrack.querySelectorAll(".service-card")) : [];
  const serviceDots = Array.from(document.querySelectorAll("#serviceDots button"));

  function updateServiceActive() {
    if (!servicesTrack || !serviceCards.length) return;

    const trackRect = servicesTrack.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;

    let activeIndex = 0;
    let closest = Infinity;

    serviceCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(center - cardCenter);

      if (distance < closest) {
        closest = distance;
        activeIndex = index;
      }
    });

    serviceCards.forEach((card, index) => {
      card.classList.toggle("is-active", index === activeIndex);
    });

    serviceDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeIndex);
    });
  }

  if (servicesTrack) {
    updateServiceActive();
    servicesTrack.addEventListener("scroll", () => {
      window.requestAnimationFrame(updateServiceActive);
    });
    window.addEventListener("resize", updateServiceActive);

    serviceDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        serviceCards[index].scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest"
        });
      });
    });
  }

  /* Google reviews slider */
  const reviews = Array.from(document.querySelectorAll(".review"));
  const prevReview = document.getElementById("prevReview");
  const nextReview = document.getElementById("nextReview");
  let reviewIndex = 0;

  function showReview(index) {
    reviews.forEach((review, i) => {
      review.classList.toggle("active", i === index);
    });
  }

  if (reviews.length && prevReview && nextReview) {
    nextReview.addEventListener("click", () => {
      reviewIndex = (reviewIndex + 1) % reviews.length;
      showReview(reviewIndex);
    });

    prevReview.addEventListener("click", () => {
      reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
      showReview(reviewIndex);
    });

    setInterval(() => {
      reviewIndex = (reviewIndex + 1) % reviews.length;
      showReview(reviewIndex);
    }, 6500);
  }

  /* Soft magnetic effect on desktop buttons */
  document.querySelectorAll(".magnetic").forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      if (window.innerWidth < 900) return;

      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.12}px, ${y * 0.16}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });

  /* Image fallback placeholders, useful while you add real images */
  const cleanText = (text) =>
    String(text || "Image à remplacer")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  function makePlaceholder(label) {
    const safeLabel = cleanText(label);
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#080808"/>
            <stop offset="55%" stop-color="#171717"/>
            <stop offset="100%" stop-color="#d9b37f"/>
          </linearGradient>
          <radialGradient id="r" cx="52%" cy="42%" r="62%">
            <stop offset="0%" stop-color="#d4af37" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#d4af37" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1200" height="900" fill="url(#g)"/>
        <rect width="1200" height="900" fill="url(#r)"/>
        <path d="M380 230 C425 140 520 120 600 160 C680 120 775 140 820 230 C900 265 930 345 890 430 C950 520 910 640 820 670 C775 760 680 785 600 740 C520 785 425 760 380 670 C290 640 250 520 310 430 C270 345 300 265 380 230Z" fill="none" stroke="#e8c86d" stroke-width="7" opacity="0.78"/>
        <text x="600" y="420" text-anchor="middle" font-family="Georgia, serif" font-size="56" fill="#fff8e8">Le Palais de la Beauté</text>
        <text x="600" y="495" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#e8c86d">${safeLabel}</text>
        <text x="600" y="552" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#fff8e8" opacity="0.72">Remplacez cette image dans /assets</text>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.src = makePlaceholder(img.dataset.fallback || img.alt);
      img.classList.add("image-placeholder");
    });
  });
});
