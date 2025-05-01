// Music Degree Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap components
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Add animation to musician cards on scroll
  const observerOptions = {
      threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate__animated', 'animate__fadeInUp');
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);

  document.querySelectorAll('.musician-card').forEach((card) => {
      observer.observe(card);
  });
}); 
const swiper = new Swiper('.musician-slider', {
  effect: 'fade',
  autoplay: {
      delay: 3000,
      disableOnInteraction: false,
  },
  loop: true,
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  on: {
      slideChange: function () {
          // Update musician info
          document.querySelectorAll('.info-slide').forEach(slide => slide.classList.remove('active'));
          document.querySelectorAll('.info-slide')[this.realIndex].classList.add('active');
      }
  }
});