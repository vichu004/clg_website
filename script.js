// Wait for the DOM to be fully loaded

// Intersection Observer to trigger animation when elements come into view
document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe all number elements
    document.querySelectorAll('.animated-number').forEach(number => {
        observer.observe(number);
    });

    // Function to animate counting
    function animateValue(obj) {
        const text = obj.textContent;
        let value = parseInt(text.replace(/[^\d]/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        let startValue = 0;
        const duration = 2000;
        const increment = Math.floor(duration / value);

        let counter = setInterval(function () {
            startValue += 1;
            obj.textContent = startValue + suffix;
            if (startValue >= value) {
                clearInterval(counter);
                obj.textContent = text; // Ensure final text is exactly as specified
            }
        }, increment);
    }
});
document.addEventListener('DOMContentLoaded', function () {
    // Get all person elements and founder details
    const personDivs = document.querySelectorAll('.founders-name div');
    const founderDetails = document.querySelectorAll('.founder-details');

    // Function to hide all founder details
    function hideAllFounderDetails() {
        founderDetails.forEach(detail => {
            detail.style.display = 'none';
        });
    }

    // Function to remove active class from all person elements
    function removeActiveClass() {
        personDivs.forEach(person => {
            person.classList.remove('active');
        });
    }

    // Initially hide all founder details except the first one
    hideAllFounderDetails();
    document.getElementById('persons1').style.display = 'flex';
    personDivs[0].classList.add('active');

    // Add click event listeners to each person div
    personDivs.forEach(person => {
        person.addEventListener('click', function () {
            // Get the data attribute or class name to identify this person
            const className = this.className;
            const personNumber = className.match(/persons(\d+)/);
            const detailId = personNumber ? 'persons' + personNumber[1] : null;

            // Check if this person is already active
            if (this.classList.contains('active')) {
                // If already active, do nothing (keeps content visible)
                return;
            }

            // Hide all founder details
            hideAllFounderDetails();

            // Remove active class from all person divs
            removeActiveClass();

            // Add active class to the clicked person div
            this.classList.add('active');

            // Show the corresponding founder details
            const detailElement = document.getElementById(detailId);
            if (detailElement) {
                detailElement.style.display = 'flex';

                // Smooth scroll to the founder details
                detailElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


// placement section code starts 
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.placement-carousel');
    const cards = document.querySelectorAll('.placement-card1');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');

    let currentIndex = 0;
    let cardsToShow = getCardsToShow();
    let cardWidth = getCardWidth();
    let totalCards = cards.length;

    // Initially position cards
    updateCarousel();

    // Handle next button click
    nextBtn.addEventListener('click', function () {
        if (currentIndex < totalCards - cardsToShow) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Handle previous button click
    prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Update carousel position
    function updateCarousel() {
        const offset = -currentIndex * cardWidth;
        carousel.style.transform = `translateX(${offset}px)`;

        // Update button states
        prevBtn.disabled = currentIndex === 0;
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';

        nextBtn.disabled = currentIndex >= totalCards - cardsToShow;
        nextBtn.style.opacity = currentIndex >= totalCards - cardsToShow ? '0.5' : '1';
    }

    // Calculate how many cards to show based on viewport width
    function getCardsToShow() {
        const viewportWidth = window.innerWidth;

        if (viewportWidth < 576) {
            return 1;
        } else if (viewportWidth < 768) {
            return 2;
        } else if (viewportWidth < 992) {
            return 3;
        } else {
            return 3;
        }
    }

    // Calculate card width including gap
    function getCardWidth() {
        // Get the first card's computed width
        const firstCard = cards[0];
        const computedStyle = window.getComputedStyle(firstCard);
        const cardComputedWidth = parseFloat(computedStyle.getPropertyValue('min-width'));

        // Get the gap between cards (20px defined in CSS)
        const gap = 20;

        return cardComputedWidth + gap;
    }

    // Handle window resize
    window.addEventListener('resize', function () {
        // Recalculate values
        cardsToShow = getCardsToShow();
        cardWidth = getCardWidth();

        // If current index would now be invalid, adjust it
        if (currentIndex > totalCards - cardsToShow) {
            currentIndex = Math.max(0, totalCards - cardsToShow);
        }

        // Update carousel position
        updateCarousel();
    });

    // Touch swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum swipe distance

        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left (next)
            if (currentIndex < totalCards - cardsToShow) {
                currentIndex++;
                updateCarousel();
            }
        }

        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right (prev)
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
    }

    // Auto slide functionality (optional)
    let autoSlideInterval = null;

    function startAutoSlide() {
        autoSlideInterval = setInterval(function () {
            if (currentIndex < totalCards - cardsToShow) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 5000); // Change slide every 5 seconds
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    // Start auto sliding
    startAutoSlide();

    // Stop auto sliding on user interaction
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('touchstart', stopAutoSlide, { passive: true });

    // Resume auto sliding when user leaves
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Sponsor section scrolling functionality
    const sponsorContainer = document.querySelector('.sponsor-container');

    if (sponsorContainer) {
        // Pause animation on hover
        sponsorContainer.addEventListener('mouseenter', function () {
            sponsorContainer.style.animationPlayState = 'paused';
        });

        // Resume animation when mouse leaves
        sponsorContainer.addEventListener('mouseleave', function () {
            sponsorContainer.style.animationPlayState = 'running';
        });

        // Touch events for mobile
        sponsorContainer.addEventListener('touchstart', function () {
            sponsorContainer.style.animationPlayState = 'paused';
        }, { passive: true });

        sponsorContainer.addEventListener('touchend', function () {
            sponsorContainer.style.animationPlayState = 'running';
        }, { passive: true });
    }
});
// placement section code ends 


document.addEventListener('DOMContentLoaded', function() {
    // Remove or comment out the carousel functionality since we're using a grid layout now
    
    // Keep the sponsor section code
    const sponsorContainer = document.querySelector('.sponsor-container');
    
    if (sponsorContainer) {
        // Sponsor container hover functionality
        sponsorContainer.addEventListener('mouseenter', function() {
            sponsorContainer.style.animationPlayState = 'paused';
        });
        
        sponsorContainer.addEventListener('mouseleave', function() {
            sponsorContainer.style.animationPlayState = 'running';
        });
        
        // Touch events for mobile
        sponsorContainer.addEventListener('touchstart', function() {
            sponsorContainer.style.animationPlayState = 'paused';
        }, { passive: true });
        
        sponsorContainer.addEventListener('touchend', function() {
            sponsorContainer.style.animationPlayState = 'running';
        }, { passive: true });
    }

    const carousel = document.querySelector('.placement-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Update carousel position
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateArrowVisibility();
    }

    // Update arrow visibility
    function updateArrowVisibility() {
        prevBtn.style.display = currentSlide === 0 ? 'none' : 'flex';
        nextBtn.style.display = currentSlide === totalSlides - 1 ? 'none' : 'flex';
    }

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });

    // Touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0 && currentSlide < totalSlides - 1) {
                nextBtn.click();
            } else if (difference < 0 && currentSlide > 0) {
                prevBtn.click();
            }
        }
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const newCardsToShow = getCardsToShow();
        if (newCardsToShow !== cardsToShow) {
            currentIndex = 0;
            updateCarousel();
        }
    });

    // Initial setup
    updateArrowVisibility();
}); 



// Video Modal Functions
function openVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('campus360Video');
    
    // Set the video source
    videoFrame.src = 'https://youtu.be/eoDXeudl1KY?si=YMzBs0Z_2js94Y2a';
    
    // Show the modal
    modal.style.display = 'block';
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }
  
  function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('campus360Video');
    
    // Hide the modal
    modal.style.display = 'none';
    
    // Clear the video source to stop playback
    videoFrame.src = '';
    
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
  }
  
  // Close modal when clicking outside the video
  window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target == modal) {
      closeVideoModal();
    }
  } 
  