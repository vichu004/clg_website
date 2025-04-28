// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Highlight current section in navbar
  const sections = document.querySelectorAll('section[id], header[id]');
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  });

  // Back to top button
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });
    
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Form submission handling
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const formValues = {};
      
      formData.forEach((value, key) => {
        formValues[key] = value;
      });
      
      // Simple form validation
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('is-invalid');
        } else {
          field.classList.remove('is-invalid');
        }
      });
      
      if (isValid) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate API call
        setTimeout(() => {
          // Reset form
          contactForm.reset();
          
          // Show success message
          const successMessage = document.createElement('div');
          successMessage.className = 'alert alert-success mt-3';
          successMessage.textContent = 'Your message has been sent successfully!';
          
          contactForm.appendChild(successMessage);
          
          // Reset button
          submitButton.disabled = false;
          submitButton.textContent = originalText;
          
          // Remove success message after 5 seconds
          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        }, 1500);
      }
    });
  }

  // Animation on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.program-card, .faculty-card, .testimonial-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight;
      
      if (elementPosition < screenPosition - 100) {
        element.classList.add('animated');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  
  // Trigger once on load
  animateOnScroll();

  // Mobile menu toggle
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      });
    });
  }

  // Handle resize for better responsive experience
  let resizeTimer;
  
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    
    // Delay execution to avoid rapid firing during resize
    resizeTimer = setTimeout(function() {
      adjustResponsiveElements();
    }, 250);
  });
  
  function adjustResponsiveElements() {
    const windowWidth = window.innerWidth;
    
    // Adjust navbar brand text for different screen sizes
    const navbarBrand = document.querySelector('.navbar-brand span');
    if (navbarBrand) {
      if (windowWidth < 768) {
        navbarBrand.style.display = 'none';
      } else {
        navbarBrand.style.display = 'inline-block';
      }
    }
    
    // Adjust header buttons on small screens
    const headerButtons = document.querySelector('.header-buttons');
    if (headerButtons) {
      const buttons = headerButtons.querySelectorAll('.btn');
      
      if (windowWidth < 420) {
        buttons.forEach(button => {
          button.classList.add('d-block', 'w-100', 'mb-2');
          button.classList.remove('me-2');
        });
      } else {
        buttons.forEach((button, index) => {
          if (index !== buttons.length - 1) {
            button.classList.add('me-2');
          }
          button.classList.remove('d-block', 'w-100', 'mb-2');
        });
      }
    }
  }
  
  // Run adjustment on initial load
  adjustResponsiveElements();

  // Piano key animation in instrument section (optional feature)
  const createPianoAnimation = function() {
    const pianoSection = document.querySelector('.instrument-section');
    
    if (!pianoSection) return;
    
    const keyCount = 12;
    const pianoKeysContainer = document.createElement('div');
    pianoKeysContainer.className = 'piano-keys';
    
    // Create piano keys
    for (let i = 0; i < keyCount; i++) {
      const key = document.createElement('div');
      key.className = 'piano-key';
      
      // Add black keys
      if ([1, 3, 6, 8, 10].includes(i % 12)) {
        key.classList.add('black-key');
      } else {
        key.classList.add('white-key');
      }
      
      // Add click event
      key.addEventListener('click', function() {
        this.classList.add('active');
        
        // Play sound (in a real implementation, you would use Web Audio API)
        // For simplicity, we're just adding a visual effect
        
        setTimeout(() => {
          this.classList.remove('active');
        }, 300);
      });
      
      pianoKeysContainer.appendChild(key);
    }
    
    // Add piano animation to the page
    const instrumentImage = pianoSection.querySelector('.instrument-image');
    if (instrumentImage) {
      instrumentImage.appendChild(pianoKeysContainer);
    }
  };
  
  // Uncomment the following line to activate the piano animation
  // createPianoAnimation();
}); 