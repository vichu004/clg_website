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

    // Function to animate counting (time-based, smooth, with suffix)
    function animateValue(obj) {
        const text = obj.textContent.trim();
        const value = parseInt(text.replace(/[^\d]/g, ''), 10) || 0;
        const suffix = text.replace(/[0-9]/g, '');
        let current = 0;
        const duration = 1500; // ms
        const frameTime = 16; // ~60fps
        const steps = Math.max(1, Math.round(duration / frameTime));
        const increment = Math.max(1, Math.round(value / steps));

        const timer = setInterval(function () {
            current += increment;
            if (current >= value) {
                clearInterval(timer);
                obj.textContent = text; // Ensure final text is exactly as specified
            } else {
                obj.textContent = current + suffix;
            }
        }, frameTime);
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
    const firstDetail = document.getElementById('persons1');
    firstDetail.style.display = 'flex';
    firstDetail.style.opacity = '1';
    firstDetail.style.transform = 'translateY(0)';
    personDivs[0].classList.add('active');
    
    // Add a small delay to ensure smooth initial display
    setTimeout(() => {
        const aboutSection = document.getElementById('home');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, 100);

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
                
                // Add a small delay for smooth transition effect
                setTimeout(() => {
                    detailElement.style.opacity = '1';
                    detailElement.style.transform = 'translateY(0)';
                }, 50);

                // Smooth scroll to the top of the About Us section
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
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


document.addEventListener('DOMContentLoaded', function () {
    // Remove or comment out the carousel functionality since we're using a grid layout now

    // Keep the sponsor section code
    const sponsorContainer = document.querySelector('.sponsor-container');

    if (sponsorContainer) {
        // Sponsor container hover functionality
        sponsorContainer.addEventListener('mouseenter', function () {
            sponsorContainer.style.animationPlayState = 'paused';
        });

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



// Toggle between NGI and University glance sections
document.addEventListener('DOMContentLoaded', function() {
    const universityBtn = document.querySelector('.university-btn');
    const ngiBtn = document.querySelector('.ngi-btn');
    const universityGlance = document.getElementById('universityglance');
    const ngiGlance = document.getElementById('ngiglance');

    // Set initial state (university glance visible, ngi glance hidden)
    if (universityGlance && ngiGlance) {
        universityGlance.style.display = 'block';
        ngiGlance.style.display = 'none';
        
        // Set initial active state for buttons
        if (universityBtn && ngiBtn) {
            universityBtn.classList.add('active');
            ngiBtn.classList.remove('active');
        }
    }

    // Add click event for university button
    if (universityBtn) {
        universityBtn.addEventListener('click', function() {
            if (universityGlance && ngiGlance) {
                // Toggle content visibility
                universityGlance.style.display = 'block';
                ngiGlance.style.display = 'none';
                
                // Toggle active state for buttons
                universityBtn.classList.add('active');
                ngiBtn.classList.remove('active');
            }
        });
    }

    // Add click event for NGI button
    if (ngiBtn) {
        ngiBtn.addEventListener('click', function() {
            if (universityGlance && ngiGlance) {
                // Toggle content visibility
                universityGlance.style.display = 'none';
                ngiGlance.style.display = 'block';
                
                // Toggle active state for buttons
                ngiBtn.classList.add('active');
                universityBtn.classList.remove('active');
            }
        });
    }
});

// Toggle between NGI and University infrastructure sections
document.addEventListener('DOMContentLoaded', function() {
    const universityiBtn = document.querySelector('.universityi-btn');
    const ngiiBtn = document.querySelector('.ngii-btn');
    const universityInfrastructure = document.getElementById('universityinfrastructure');
    const ngiInfrastructure = document.getElementById('ngiinfrastructure');

    // Set initial state (university infrastructure visible, ngi infrastructure hidden)
    if (universityInfrastructure && ngiInfrastructure) {
        universityInfrastructure.style.display = 'block';
        ngiInfrastructure.style.display = 'none';
        
        // Set initial active state for buttons
        if (universityiBtn && ngiiBtn) {
            universityiBtn.classList.add('active');
            ngiiBtn.classList.remove('active');
        }
    }

    // Add click event for university infrastructure button
    if (universityiBtn) {
        universityiBtn.addEventListener('click', function() {
            if (universityInfrastructure && ngiInfrastructure) {
                // Toggle content visibility
                universityInfrastructure.style.display = 'block';
                ngiInfrastructure.style.display = 'none';
                
                // Toggle active state for buttons
                universityiBtn.classList.add('active');
                ngiiBtn.classList.remove('active');
            }
        });
    }

    // Add click event for NGI infrastructure button
    if (ngiiBtn) {
        ngiiBtn.addEventListener('click', function() {
            if (universityInfrastructure && ngiInfrastructure) {
                // Toggle content visibility
                universityInfrastructure.style.display = 'none';
                ngiInfrastructure.style.display = 'block';
                
                // Toggle active state for buttons
                ngiiBtn.classList.add('active');
                universityiBtn.classList.remove('active');
            }
        });
    }
});

// Video Modal Functions
function openVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('campus360Video');
    const unmuteBtn = document.getElementById('unmuteBtn');

    const vid_id = '-V_T9_18fLo';
    videoFrame.src = `https://www.youtube.com/embed/${vid_id}?autoplay=1&controls=0&rel=0&modestbranding=1&showinfo=0&playsinline=1&mute=1`;    

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Show unmute button
    unmuteBtn.style.display = 'block';
    unmuteBtn.textContent = '🔇 Unmute';

    unmuteBtn.onclick = () => {
      videoFrame.src = `https://www.youtube.com/embed/${vid_id}?autoplay=1&controls=0&rel=0&modestbranding=1&showinfo=0&playsinline=1&mute=0`;
      unmuteBtn.style.display = 'none'; // hide after unmute
    };
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('campus360Video');
    const unmuteBtn = document.getElementById('unmuteBtn');

    modal.style.display = 'none';
    videoFrame.src = '';
    document.body.style.overflow = 'auto';

    // Hide unmute button on close
    unmuteBtn.style.display = 'none';
}

// Unified animation function for both tech and health science cards
function initializeCards(selector) {
  const cards = document.querySelectorAll(selector);
  
  cards.forEach(card => {
    // Add 3D tilt effect
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      const scale = 1.05;
      
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale(${scale})
      `;
      
      // Add highlight effect
      const shine = `radial-gradient(
        circle at ${x}px ${y}px,
        rgba(255,255,255,0.2) 0%,
        rgba(255,255,255,0.1) 20%,
        rgba(255,255,255,0) 50%
      )`;
      
      card.style.backgroundImage = shine;
    });
    
    // Reset transform and remove highlight on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      card.style.backgroundImage = 'none';
      
      // Add smooth return animation
      card.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
      setTimeout(() => {
        card.style.transition = ''; // Remove transition after animation
      }, 500);
    });
    
    // Add click effect
    card.addEventListener('click', () => {
      card.classList.add('clicked');
      
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      card.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
        card.classList.remove('clicked');
      }, 600);
    });
  });
  
  // Add intersection observer for fade-in effect
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.transform = 'translateY(0) scale(1)';
        entry.target.style.opacity = '1';
      }
    });
  }, { 
    threshold: 0.2,
    rootMargin: '50px'
  });
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) scale(0.95)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
  });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize both tech and health science cards
  initializeCards('.tech-detail-box, .hs-detail-box');
});