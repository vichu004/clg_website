      // Wait for DOM to load
      document.addEventListener('DOMContentLoaded', function() {
            
        // Form submission handling
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const firstName = document.getElementById('firstName').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            
            // Simple validation
            if (!firstName || !email || !subject) {
                showAlert('Please fill in all required fields.', 'danger');
                return;
            }
            
            // Show loading state
            const submitBtn = document.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showAlert('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // Contact card hover effects
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Institution card click effects
        const institutionCards = document.querySelectorAll('.institution-card');
        institutionCards.forEach(card => {
            card.addEventListener('click', function() {
                // Add click effect
                this.style.transform = 'translateX(15px) scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'translateX(10px) scale(1)';
                }, 150);
            });
        });
        
        // Map placeholder click -> load interactive map with current location
        const mapPlaceholder = document.querySelector('.map-placeholder');
        if (mapPlaceholder) {
            mapPlaceholder.addEventListener('click', function initInteractiveMap() {
                const mapContainer = document.querySelector('.map-container');
                if (!mapContainer) { return; }

                // Prevent multiple initializations
                mapPlaceholder.removeEventListener('click', initInteractiveMap);

                // Inject Leaflet assets (no API key needed)
                function loadLeafletAssets(onReady) {
                    const leafletCssId = 'leaflet-css';
                    const leafletJsId = 'leaflet-js';
                    if (!document.getElementById(leafletCssId)) {
                        const link = document.createElement('link');
                        link.id = leafletCssId;
                        link.rel = 'stylesheet';
                        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                        document.head.appendChild(link);
                    }
                    const ensureJs = () => {
                        if (!document.getElementById(leafletJsId)) {
                            const script = document.createElement('script');
                            script.id = leafletJsId;
                            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                            script.onload = onReady;
                            document.body.appendChild(script);
                        } else {
                            onReady();
                        }
                    };
                    // If CSS just added, give the browser a tick before JS for better FOUC avoidance
                    setTimeout(ensureJs, 0);
                }

                function initializeMap() {
                    mapContainer.innerHTML = '<div id="interactive-map" style="height: 360px; border-radius: 8px; overflow: hidden;"></div>';
                    // eslint-disable-next-line no-undef
                    const map = L.map('interactive-map');
                    
                    // Base layers
                    // eslint-disable-next-line no-undef
                    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                        maxZoom: 19,
                        attribution: 'Imagery © Esri, Maxar, Earthstar Geographics, and the GIS User Community'
                    });
                    // eslint-disable-next-line no-undef
                    const streetsEsri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                        maxZoom: 19,
                        attribution: 'Map data © Esri & contributors'
                    });
                    // eslint-disable-next-line no-undef
                    const osmStandard = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; OpenStreetMap contributors'
                    });
                    
                    // Default layer
                    satellite.addTo(map);
                    
                    // Layer control
                    // eslint-disable-next-line no-undef
                    L.control.layers({
                        'Satellite (Esri)': satellite,
                        'Streets (Esri)': streetsEsri,
                        'OSM Standard': osmStandard
                    }, null, { position: 'topright', collapsed: false }).addTo(map);

                    const coimbatoreCenter = [11.0168, 76.9558];
                    map.setView(coimbatoreCenter, 12);
                    // eslint-disable-next-line no-undef
                    L.marker(coimbatoreCenter).addTo(map).bindPopup('Coimbatore').closePopup();

                    if ('geolocation' in navigator) {
                        navigator.geolocation.getCurrentPosition(function(pos) {
                            const userCoords = [pos.coords.latitude, pos.coords.longitude];
                            map.setView(userCoords, 14);
                            // eslint-disable-next-line no-undef
                            L.marker(userCoords).addTo(map).bindPopup('Your Current Location').openPopup();
                        }, function(err) {
                            showAlert('Could not access your location. Showing Coimbatore area instead.', 'warning');
                        }, { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 });
                    } else {
                        showAlert('Geolocation not supported by your browser.', 'warning');
                    }
                }

                loadLeafletAssets(initializeMap);
            });
            
            mapPlaceholder.style.cursor = 'pointer';
        }
        
        // Smooth scrolling for navigation
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Add active effect
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Form input focus effects
        const formInputs = document.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'all 0.3s ease';
            });
            
            input.addEventListener('blur', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.contact-card, .institution-card');
        animateElements.forEach(el => observer.observe(el));

        // Toggle institutions and move indicator between original and bottom positions
        const viewMoreBtn = document.getElementById('view-more-institutions');
        const indicatorContainer = document.getElementById('view-more-indicator-container');
        const moreInstitutionsList = document.querySelectorAll('[id^="more-institutions"]');
        if (viewMoreBtn && indicatorContainer && moreInstitutionsList && moreInstitutionsList.length) {
            let isExpanded = false;
            // Placeholder to remember original position of the indicator container
            const indicatorPlaceholder = document.createElement('div');
            indicatorPlaceholder.id = 'view-more-indicator-placeholder';
            if (indicatorContainer.parentNode) {
                indicatorContainer.parentNode.insertBefore(indicatorPlaceholder, indicatorContainer);
            }

            viewMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                isExpanded = !isExpanded;

                // Show or hide the extra sections
                moreInstitutionsList.forEach(section => {
                    section.style.display = isExpanded ? 'block' : 'none';
                });

                // Move indicator to bottom or back to original place
                if (isExpanded) {
                    const lastSection = moreInstitutionsList[moreInstitutionsList.length - 1];
                    if (lastSection && lastSection.parentNode) {
                        lastSection.parentNode.insertBefore(indicatorContainer, lastSection.nextSibling);
                    }
                } else if (indicatorPlaceholder.parentNode) {
                    indicatorPlaceholder.parentNode.insertBefore(indicatorContainer, indicatorPlaceholder);
                }

                // Toggle chevron icon
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-chevron-down', !isExpanded);
                    icon.classList.toggle('fa-chevron-up', isExpanded);
                }
            });
        }
    });
    
    // Utility function to show alerts
    function showAlert(message, type = 'info') {
        // Remove existing alerts
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create new alert
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alert);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alert && alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
    
    // Newsletter subscription
    document.querySelector('.input-group .btn').addEventListener('click', function() {
        const emailInput = document.querySelector('.input-group input[type="email"]');
        const email = emailInput.value;
        
        if (email && email.includes('@')) {
            showAlert('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
        } else {
            showAlert('Please enter a valid email address.', 'warning');
        }
    });
    