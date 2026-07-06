window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hide");
    }, 450);
  }
});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.classList.toggle("menu-open", isOpen);
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

const cursorGlow = document.getElementById("cursorGlow");

document.addEventListener("mousemove", (event) => {
  if (!cursorGlow) return;

  cursorGlow.style.left = event.clientX + "px";
  cursorGlow.style.top = event.clientY + "px";
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.14
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.count || 0);

      let current = 0;
      const step = Math.max(1, Math.ceil(target / 45));

      const timer = setInterval(() => {
        current += step;

        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, 24);

      countObserver.unobserve(counter);
    });
  },
  {
    threshold: 0.65
  }
);

document.querySelectorAll("[data-count]").forEach((counter) => {
  countObserver.observe(counter);
});

const reviews = [
  {
    text: "“Professional, friendly, and very detailed. My home felt brand new.”",
    name: "Happy Customer"
  },
  {
    text: "“Reliable service and great communication. I highly recommend them.”",
    name: "Local Homeowner"
  },
  {
    text: "“The free estimate process was easy and the cleaning was excellent.”",
    name: "Lake Charles Resident"
  },
  {
    text: "“They were easy to contact, very respectful, and the house looked beautiful.”",
    name: "Westlake Customer"
  }
];

let reviewIndex = 0;

const reviewText = document.getElementById("reviewText");
const reviewName = document.getElementById("reviewName");
const prevReview = document.getElementById("prevReview");
const nextReview = document.getElementById("nextReview");

function showReview(direction) {
  reviewIndex = (reviewIndex + direction + reviews.length) % reviews.length;

  if (!reviewText || !reviewName) return;

  reviewText.style.opacity = "0";
  reviewName.style.opacity = "0";

  setTimeout(() => {
    reviewText.textContent = reviews[reviewIndex].text;
    reviewName.textContent = reviews[reviewIndex].name;

    reviewText.style.opacity = "1";
    reviewName.style.opacity = "1";
  }, 180);
}

if (prevReview) {
  prevReview.addEventListener("click", () => showReview(-1));
}

if (nextReview) {
  nextReview.addEventListener("click", () => showReview(1));
}

setInterval(() => {
  showReview(1);
}, 6500);

const lightbox = document.getElementById("lightbox");
const lightboxTitle = document.getElementById("lightboxTitle");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".gallery-card").forEach((card) => {
  card.addEventListener("click", () => {
    if (lightboxTitle) {
      lightboxTitle.textContent = card.dataset.title || "Gallery";
    }

    if (lightbox) {
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    }
  });
});

if (closeLightbox) {
  closeLightbox.addEventListener("click", () => {
    if (lightbox) {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
    }
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
    }
  });
}

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (!topBtn) return;

  if (window.scrollY > 700) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});
