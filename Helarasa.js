// Wait for DOM to load completely
document.addEventListener("DOMContentLoaded", function () {
  // Add AOS (Animate On Scroll) functionality through our own implementation
  initScrollAnimations();

  // Initialize animations
  initPageLoadAnimations();

  // Setup smooth scrolling for navigation links
  setupSmoothScrolling();

  // Setup continuous scroll animations
  setupContinuousAnimations();

  // Initialize hover animations
  initHoverAnimations();

  // Add active state to navigation based on scroll position
  setupNavActiveState();

  // Add parallax effects
  initParallaxEffects();
});

// Initialize animations that should run on page load
function initPageLoadAnimations() {
  // Add a class to the body to trigger initial animations
  document.body.classList.add("loaded");

  // Create staggered animation for navbar items
  const navItems = document.querySelectorAll(".navbar-nav .nav-item");
  navItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(-20px)";

    setTimeout(() => {
      item.style.transition = "all 0.5s ease";
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, 100 + index * 100);
  });

  // Animate hero section elements with staggered timing
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    const heroElements = heroContent.children;
    Array.from(heroElements).forEach((element, index) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";

      setTimeout(() => {
        element.style.transition = "all 0.5s ease";
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, 500 + index * 200);
    });
  }
}

// Initialize our own Animate On Scroll functionality
function initScrollAnimations() {
  // Create animation CSS
  const animationStyles = document.createElement("style");
  animationStyles.textContent = `
        /* Base animation classes */
        [data-animate] {
            opacity: 0;
            transition-duration: 0.8s;
            transition-timing-function: cubic-bezier(0.5, 0, 0, 1);
            transition-property: opacity, transform;
        }
        
        /* Fade animations */
        [data-animate="fade-up"] {
            transform: translateY(50px);
        }
        [data-animate="fade-down"] {
            transform: translateY(-50px);
        }
        [data-animate="fade-left"] {
            transform: translateX(50px);
        }
        [data-animate="fade-right"] {
            transform: translateX(-50px);
        }
        [data-animate="zoom-in"] {
            transform: scale(0.8);
        }
        [data-animate="flip"] {
            transform: perspective(800px) rotateY(25deg);
        }
        
        /* Animation speeds */
        [data-duration="fast"] {
            transition-duration: 0.4s !important;
        }
        [data-duration="slow"] {
            transition-duration: 1.2s !important;
        }
        
        /* Animation delays */
        [data-delay="100"] {
            transition-delay: 0.1s !important;
        }
        [data-delay="200"] {
            transition-delay: 0.2s !important;
        }
        [data-delay="300"] {
            transition-delay: 0.3s !important;
        }
        [data-delay="400"] {
            transition-delay: 0.4s !important;
        }
        [data-delay="500"] {
            transition-delay: 0.5s !important;
        }
        
        /* Animated state */
        [data-animate].animated {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1) rotate(0) rotateY(0);
        }
    `;
  document.head.appendChild(animationStyles);

  // Add animation attributes to elements
  setupAnimationAttributes();

  // Create intersection observer to trigger animations
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");

          // If the element has a counter, animate it
          if (entry.target.hasAttribute("data-counter")) {
            animateCounter(entry.target);
          }

          // Optional: Only animate once
          // animationObserver.unobserve(entry.target);

          // For repeating animations when scrolling up/down multiple times:
          // Keep the observer active and remove/add the animated class when
          // entering and leaving the viewport
          setTimeout(() => {
            if (!entry.isIntersecting) {
              entry.target.classList.remove("animated");
            }
          }, 100);
        } else {
          // Remove animation class when element leaves viewport
          // (for repeating animations when scrolling up/down)
          entry.target.classList.remove("animated");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  // Observe all elements with data-animate attribute
  document.querySelectorAll("[data-animate]").forEach((element) => {
    animationObserver.observe(element);
  });
}

// Setup animation attributes for all elements
function setupAnimationAttributes() {
  // Why section
  document.querySelectorAll(".why-card").forEach((card, index) => {
    card.setAttribute("data-animate", "fade-up");
    card.setAttribute("data-delay", (index * 100).toString());
  });

  // Solutions section
  document.querySelectorAll(".solution-item").forEach((item, index) => {
    item.setAttribute("data-animate", "zoom-in");
    item.setAttribute("data-delay", (index * 50).toString());
  });

  // Courses section
  const coursesSection = document.querySelector(".courses");
  if (coursesSection) {
    const coursesContent = coursesSection.querySelector(".col-lg-5 > div");
    const coursesImage = coursesSection.querySelector(".col-lg-7 img");

    if (coursesContent) {
      coursesContent.setAttribute("data-animate", "fade-right");
    }
    if (coursesImage) {
      coursesImage.setAttribute("data-animate", "fade-left");
      coursesImage.setAttribute("data-delay", "200");
    }
  }

  // Lifestyle section
  document.querySelectorAll(".lifestyle-img").forEach((img, index) => {
    img.setAttribute("data-animate", "fade-up");
    img.setAttribute("data-delay", (index * 100).toString());
  });

  // Lifestyle quote
  const lifestyleQuote = document.querySelector(".lifestyle-quote");
  if (lifestyleQuote) {
    lifestyleQuote.setAttribute("data-animate", "fade-up");
    lifestyleQuote.setAttribute("data-delay", "100");
  }

  // Recipes section
  const recipesSection = document.querySelector("#recipes");
  if (recipesSection) {
    const recipesContent = recipesSection.querySelector(
      ".col-lg-6:first-child"
    );
    const recipesImage = recipesSection.querySelector(
      ".col-lg-6:last-child .position-relative"
    );

    if (recipesContent) {
      recipesContent.setAttribute("data-animate", "fade-right");
    }
    if (recipesImage) {
      recipesImage.setAttribute("data-animate", "fade-left");
      recipesImage.setAttribute("data-delay", "200");
    }
  }

  // Process steps
  document.querySelectorAll(".process-step").forEach((step, index) => {
    step.setAttribute("data-animate", "fade-up");
    step.setAttribute("data-delay", (index * 100).toString());
  });

  // Testimonials
  document.querySelectorAll(".testimonial").forEach((testimonial, index) => {
    testimonial.setAttribute("data-animate", "fade-up");
    testimonial.setAttribute("data-delay", (index * 100).toString());
  });

  // Footer columns
  document.querySelectorAll("footer .col-lg-3").forEach((col, index) => {
    col.setAttribute("data-animate", "fade-up");
    col.setAttribute("data-delay", (index * 100).toString());
  });

  // Section titles
  document.querySelectorAll("section h2").forEach((title) => {
    title.setAttribute("data-animate", "fade-up");
  });
}

// Animate counter elements
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-counter") || "0");
  const duration = parseInt(
    element.getAttribute("data-counter-duration") || "2000"
  );
  const prefix = element.getAttribute("data-counter-prefix") || "";
  const suffix = element.getAttribute("data-counter-suffix") || "";

  let startTime;
  let currentNumber = 0;

  function updateCounter(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    currentNumber = Math.floor(progress * target);
    element.textContent = prefix + currentNumber + suffix;

    if (progress < 1) {
      window.requestAnimationFrame(updateCounter);
    } else {
      element.textContent = prefix + target + suffix;
    }
  }

  window.requestAnimationFrame(updateCounter);
}

// Setup smooth scrolling for all navigation links
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Get the target section
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      // Get the navbar height for offset
      const navbarHeight = document.querySelector(".navbar").offsetHeight;

      // Calculate position to scroll to (with navbar offset)
      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      // Animate the scroll
      animateScroll(targetPosition, 800);

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
}

// Animated scroll function
function animateScroll(targetPosition, duration) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Easing function for smoother animation
    const easeInOutQuad = (progress) => {
      return progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    };

    window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

    if (timeElapsed < duration) {
      window.requestAnimationFrame(animation);
    }
  }

  window.requestAnimationFrame(animation);
}

// Setup continuous animations that play as user scrolls
function setupContinuousAnimations() {
  window.addEventListener("scroll", function () {
    const scrollPosition = window.pageYOffset;

    // Parallax effect for hero section
    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      const heroHeight = heroSection.offsetHeight;
      const scrollPercentage = Math.min(scrollPosition / heroHeight, 1);
      heroSection.style.backgroundPositionY = `${50 + scrollPercentage * 20}%`;
    }

    // Rotate pattern images
    const patterns = document.querySelectorAll(".pattern-bg");
    patterns.forEach((pattern) => {
      pattern.style.transform = `rotate(${scrollPosition * 0.03}deg)`;
    });

    // Scale effect for why-cards when they come into view
    document.querySelectorAll(".why-card").forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (cardTop < windowHeight * 0.8) {
        const visibility = 1 - Math.max(0, cardTop / (windowHeight * 0.8));
        card.style.transform = `translateY(${Math.max(
          0,
          20 - visibility * 20
        )}px)`;
      }
    });
  });
}

// Initialize hover animations
function initHoverAnimations() {
  // Why cards
  document.querySelectorAll(".why-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px)";
      this.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
      this.style.transition =
        "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });

  // Solution items
  document.querySelectorAll(".solution-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".solution-icon");
      if (icon) {
        icon.style.transform = "scale(1.2) rotate(10deg)";
        icon.style.transition =
          "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      }
    });

    item.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".solution-icon");
      if (icon) {
        icon.style.transform = "";
      }
    });
  });

  // Process steps
  document.querySelectorAll(".process-step").forEach((step) => {
    step.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)";
      this.style.transition =
        "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

      const stepNumber = this.querySelector(".step-number");
      if (stepNumber) {
        stepNumber.style.transform = "scale(1.2)";
        stepNumber.style.transition = "all 0.3s ease";
      }
    });

    step.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";

      const stepNumber = this.querySelector(".step-number");
      if (stepNumber) {
        stepNumber.style.transform = "";
      }
    });
  });

  // Testimonials
  document.querySelectorAll(".testimonial").forEach((testimonial) => {
    testimonial.addEventListener("mouseenter", function () {
      const playIcon = this.querySelector(".testimonial-play");
      const img = this.querySelector("img");

      if (playIcon) {
        playIcon.style.transform = "translate(-50%, -50%) scale(1.3)";
        playIcon.style.transition = "all 0.3s ease";
      }

      if (img) {
        img.style.filter = "brightness(0.5)";
        img.style.transform = "scale(1.05)";
        img.style.transition = "all 0.3s ease";
      }
    });

    testimonial.addEventListener("mouseleave", function () {
      const playIcon = this.querySelector(".testimonial-play");
      const img = this.querySelector("img");

      if (playIcon) {
        playIcon.style.transform = "translate(-50%, -50%) scale(1)";
      }

      if (img) {
        img.style.filter = "";
        img.style.transform = "";
      }
    });

    testimonial.addEventListener("click", function () {
      const playIcon = this.querySelector(".testimonial-play");
      if (playIcon) {
        // Add a pulse animation
        playIcon.classList.add("pulse-animation");

        setTimeout(() => {
          playIcon.classList.remove("pulse-animation");
        }, 1000);
      }
    });
  });

  // Navigation links
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("mouseenter", function () {
      if (!this.classList.contains("active")) {
        this.style.color = "var(--primary)";
        this.style.transition = "all 0.3s ease";
      }
    });

    link.addEventListener("mouseleave", function () {
      if (!this.classList.contains("active")) {
        this.style.color = "";
      }
    });
  });
}

// Make navigation highlight current section
function setupNavActiveState() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  // Add CSS for active nav links
  const navStyles = document.createElement("style");
  navStyles.textContent = `
        .navbar-nav .nav-link.active {
            color: var(--primary) !important;
            position: relative;
        }
        
        .navbar-nav .nav-link.active:after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 2px;
            background-color: var(--primary);
            transition: width 0.3s ease;
        }
        
        .navbar-nav .nav-link.active:hover:after {
            width: 30px;
        }
        
        /* Animation for navbar background on scroll */
        .navbar {
            transition: all 0.3s ease;
        }
        
        .navbar.scrolled {
            background-color: rgba(255, 255, 255, 0.95) !important;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
    `;
  document.head.appendChild(navStyles);

  // Update active link on scroll
  window.addEventListener("scroll", function () {
    let current = "";
    const scrollPosition = window.scrollY;
    const navHeight = document.querySelector(".navbar").offsetHeight;

    // Update navbar background
    if (scrollPosition > 50) {
      document.querySelector(".navbar").classList.add("scrolled");
    } else {
      document.querySelector(".navbar").classList.remove("scrolled");
    }

    // Find current section
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navHeight - 100; // More offset for better UX
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = "#" + section.getAttribute("id");
      }
    });

    // Update active class
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === current) {
        link.classList.add("active");
      }
    });
  });
}

// Initialize parallax effects
function initParallaxEffects() {
  // Add a special class to elements that should have parallax effects
  const parallaxStyles = document.createElement("style");
  parallaxStyles.textContent = `
        .parallax-element {
            transition: transform 0.1s linear;
        }
        
        /* Pulse animation for play button */
        @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.7; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        
        .pulse-animation {
            animation: pulse 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
    `;
  document.head.appendChild(parallaxStyles);

  // Add parallax class to elements
  document
    .querySelectorAll(".lifestyle-img, .pattern-bg img")
    .forEach((element) => {
      element.classList.add("parallax-element");
    });

  // Add parallax movement based on mouse position
  document.addEventListener("mousemove", function (e) {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    document.querySelectorAll(".parallax-element").forEach((element) => {
      const speed = element.getAttribute("data-parallax-speed") || "20";
      const moveX = mouseX * parseInt(speed);
      const moveY = mouseY * parseInt(speed);

      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
}

// Add a loading animation for the entire page
window.addEventListener("load", function () {
  // Create loading overlay
  const loadingOverlay = document.createElement("div");
  loadingOverlay.className = "loading-overlay";
  loadingOverlay.innerHTML = `
        <div class="spinner"></div>
    `;
  document.body.appendChild(loadingOverlay);

  // Add styles
  const loadingStyles = document.createElement("style");
  loadingStyles.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.8s ease, visibility 0.8s ease;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0,0,0,0.1);
            border-radius: 50%;
            border-top-color: var(--primary);
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .loading-overlay.hidden {
            opacity: 0;
            visibility: hidden;
        }
    `;
  document.head.appendChild(loadingStyles);

  // Hide loading overlay after a delay
  setTimeout(() => {
    loadingOverlay.classList.add("hidden");
    // Remove it from DOM after the transition
    setTimeout(() => {
      document.body.removeChild(loadingOverlay);
    }, 800);
  }, 800);

  // Trigger animations for visible elements
  document.querySelectorAll("[data-animate]").forEach((element) => {
    if (isElementInViewport(element)) {
      setTimeout(() => {
        element.classList.add("animated");
      }, 800);
    }
  });
});

// Check if an element is in the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0 &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right >= 0
  );
}

// Add scroll progress indicator
(function () {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  const progressStyles = document.createElement("style");
  progressStyles.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: var(--primary);
            width: 0%;
            z-index: 9999;
            transition: width 0.1s ease;
        }
    `;
  document.head.appendChild(progressStyles);

  window.addEventListener("scroll", function () {
    const windowHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progress = (scrollPosition / windowHeight) * 100;

    progressBar.style.width = progress + "%";
  });
})();

// Add animated back to top button that appears when scrolling down
(function () {
  const backToTopButton = document.createElement("button");
  backToTopButton.className = "back-to-top";
  backToTopButton.innerHTML = "↑";
  document.body.appendChild(backToTopButton);

  const buttonStyles = document.createElement("style");
  buttonStyles.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary);
            color: white;
            font-size: 24px;
            border: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 9998;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
    `;
  document.head.appendChild(buttonStyles);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  // Scroll to top with animation when clicked
  backToTopButton.addEventListener("click", function () {
    animateScroll(0, 800);
  });
})();
