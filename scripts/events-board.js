// events-board.js
document.addEventListener('DOMContentLoaded', () => {
    // Simulated user data (replace with actual user authentication)
    const userRole = 'mentee'; // or 'mentor'

    // Simulated events data (replace with actual data fetching)
    const events = [
        { id: 1, title: 'Introduction to JavaScript', status: 'to-do', date: '2024-10-20', time: '14:00' },
        { id: 2, title: 'Introduction to JavaScript', status: 'to-do', date: '2024-10-20', time: '14:00' },
        { id: 3, title: 'Advanced React Techniques', status: 'doing', date: '2024-10-22', time: '15:30' },
        { id: 4, title: 'Python for Data Science', status: 'done', date: '2024-10-17', time: '10:00' },
        { id: 5, title: 'Python for Data Science', status: 'done', date: '2024-10-17', time: '10:00' },
        { id: 6, title: 'Python for Data Science', status: 'done', date: '2024-10-17', time: '10:00' },
    ];

    function createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${event.title}</h3>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
        `;
        return card;
    }

    function populateBoard() {
        events.forEach(event => {
            const container = document.getElementById(`${event.status}-container`);
            const card = createEventCard(event);
            container.appendChild(card);
        });
    }

    function initAnimations() {
        gsap.from('.column', {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });

        gsap.from('.card', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.5
        });
    }

    populateBoard();
    initAnimations();
});