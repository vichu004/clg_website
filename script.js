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