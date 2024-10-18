// Create starry background
function createStars() {
    const starsContainer = document.getElementById('stars-background');
    const starCount = 4000;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        starsContainer.appendChild(star);
    }
}

function initSidebarAnimations() {
    gsap.from('.sidebar', {
        x: -60,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.sidebar li', {
        opacity: 0,
        x: -20,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
    });
}

// Update your existing initAnimations function
function initAnimations() {
    gsap.from('.main-title', { opacity: 0, y: -50, duration: 1, ease: 'power3.out' });
    gsap.from('.view-events-button', { opacity: 0, y: -30, duration: 1, delay: 0.3, ease: 'power3.out' });
    gsap.from('.tagline', { opacity: 0, y: 30, duration: 1, delay: 0.6, ease: 'power3.out' });
    gsap.from('.info-section', { opacity: 0, y: 30, duration: 1, delay: 0.9, ease: 'power3.out' });
    gsap.from('.brain-icon', {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        delay: 1.2,
        ease: 'elastic.out(1, 0.5)'
    });
}

// Update your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    initAnimations();
    initSidebarAnimations();

    // Add event listener for the "View Events Board" button
    document.getElementById('view-events').addEventListener('click', () => {
        // Add logic to navigate to the events board page
        console.log('Navigating to events board...');
    });
});