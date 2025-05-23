// Content data for each sectio

// Get all navigation buttons
const navButtons = document.querySelectorAll('.nav-btn');
const contentSection = document.querySelector('.profile-section');

// Function to update content
function updateContent(sectionKey) {
    const data = contentData[sectionKey];
    
    // If no data exists for this section, return
    if (!data) return;

    // Update the content
    contentSection.innerHTML = `
        <div class="profile-header">
            <h2 class="profile-title">${data.title}</h2>
            <h3 class="profile-name">${data.name}</h3>
        </div>
        
        <div class="profile-content">
            <img src="${data.image}" alt="${data.name}" class="profile-image">
            
            <div class="profile-description">
                ${data.description}
            </div>
        </div>
    `;
}

// Add click event listeners to all navigation buttons
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update content based on button text
        updateContent(button.textContent.trim());
    });
});
