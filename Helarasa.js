// Reveal sections on scroll
document.addEventListener("DOMContentLoaded", function () {
  function revealOnScroll() {
    var elements = document.querySelectorAll(".animate");
    var windowHeight = window.innerHeight;
    elements.forEach(function (el) {
      var position = el.getBoundingClientRect().top;
      if (position < windowHeight - 80) {
        el.classList.add("visible");
      }
    });
  }
  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);

  // Optional: Play button animation on success stories
  var cards = document.querySelectorAll(".video-thumbnail");
  cards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      var btn = card.querySelector(".play-button");
      if (btn) btn.style.transform = "scale(1.15) translate(-50%, -50%)";
    });
    card.addEventListener("mouseleave", function () {
      var btn = card.querySelector(".play-button");
      if (btn) btn.style.transform = "scale(1) translate(-50%, -50%)";
    });
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth",
        });
      }
    });
  });
});
