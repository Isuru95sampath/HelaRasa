

const image = document.querySelector(".img1");

window.addEventListener("scroll", () => {
    let scrollValue = window.scrollY;
    let scaleValue = 1 - scrollValue / 1000; // Gradually decrease size

    // Prevent the image from getting too small or too large
    if (scaleValue < 0.5) scaleValue = 0.5; // Minimum scale limit
    if (scaleValue > 1) scaleValue = 1; // Maximum scale limit

    image.style.transform = `scale(${scaleValue})`;
});


let lastScrollTop = 0;
const text = document.querySelector('.card');

window.addEventListener('scroll', function() {
    let currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop) {
        // Scrolling down - remove shine and bounce
        text.classList.remove('shine', 'bounce');
    } else {
        // Scrolling up - add shine and bounce
        text.classList.add('shine', 'bounce');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll
});


//card animations

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");

    function checkCards() {
        const triggerBottom = window.innerHeight * 0.85; // 85% of viewport height

        cards.forEach((card) => {
            const cardTop = card.getBoundingClientRect().top;

            if (cardTop < triggerBottom) {
                card.classList.add("show"); // Show when in viewport
            } else {
                card.classList.remove("show"); // Hide when scrolled away
            }
        });
    }

    window.addEventListener("scroll", checkCards);
    checkCards(); // Run on page load
});





    document.addEventListener("DOMContentLoaded", function () {
        const sections = document.querySelectorAll(".animate");

        const checkVisibility = () => {
            sections.forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionBottom = section.getBoundingClientRect().bottom;

                // If the section is in the viewport
                if (sectionTop < window.innerHeight && sectionBottom >= 0) {
                    section.classList.add("fadeInUp"); // Add the animation class
                }
            });
        };

        // Check visibility on scroll and page load
        window.addEventListener("scroll", checkVisibility);
        window.addEventListener("load", checkVisibility);
    });



    //About sectin

    // Create an IntersectionObserver instance
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add the 'in-view' class when the element is in view
        entry.target.classList.add('in-view');
        // Optional: Once the animation is done, you can stop observing the element
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 }); // 50% of the element needs to be visible
  
  // Observe the elements
  const aboutContent = document.querySelector('.about-content');
  const aboutImage = document.querySelector('.about-image');
  
  observer.observe(aboutContent);
  observer.observe(aboutImage);
  
    