const calendarGrid = document.getElementById('calendar-grid');
        const timeSlotsContainer = document.getElementById('time-slots-container');
        const selectedDateSpan = document.getElementById('selected-date');
        const scheduleDate = document.getElementById('schedule-date');
        const scheduleContainer = document.getElementById('schedule-container');
        const continueBtn = document.getElementById('continue-btn');
        const currentMonthElement = document.getElementById('current-month');
        const prevMonthBtn = document.getElementById('prev-month');
        const nextMonthBtn = document.getElementById('next-month');

        let currentDate = new Date();
        let selectedDate = null;
        let selectedTimeSlot = null;

        const availableDays = [5, 6, 7, 12, 13, 14, 20, 21, 27, 28, 29];
        const timeSlots = ['11:30-12:00', '13:00-13:30', '15:00-15:30', '17:00-17:30'];
        const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const bookedSlots = {
            '2024-06-05': ['11:30-12:00', '15:00-15:30'],
            '2024-06-12': ['13:00-13:30'],
            '2024-06-20': ['17:00-17:30']
        };
        const bookedSessions = {
            '2024-06-05': {
                '11:30-12:00': 'John Doe',
                '15:00-15:30': 'Jane Smith'
            },
            '2024-06-12': {
                '13:00-13:30': 'Alice Johnson'
            },
            '2024-06-20': {
                '17:00-17:30': 'Bob Brown'
            }
        };

        function createCalendar(year, month) {
            calendarGrid.innerHTML = '';
            
            // Add weekday headers
            weekdays.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.classList.add('calendar-weekday');
                dayElement.textContent = day;
                calendarGrid.appendChild(dayElement);
            });

            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();

            // Add empty cells for days before the first of the month
            for (let i = 0; i < (firstDay.getDay() + 6) % 7; i++) {
                calendarGrid.appendChild(document.createElement('div'));
            }

            for (let i = 1; i <= daysInMonth; i++) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('calendar-day');
                if (availableDays.includes(i)) {
                    dayElement.classList.add('available');
                }
                const currentDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                if (bookedSlots[currentDate]) {
                    dayElement.classList.add('booked');
                }
                dayElement.textContent = i;
                dayElement.addEventListener('click', () => selectDate(year, month, i));
                calendarGrid.appendChild(dayElement);
            }

            currentMonthElement.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;
        }

        function createTimeSlots() {
            timeSlotsContainer.innerHTML = '';
            const currentDate = selectedDate.toISOString().split('T')[0];
            const bookedSlotsForDay = bookedSlots[currentDate] || [];

            timeSlots.forEach(slot => {
                const slotElement = document.createElement('div');
                slotElement.classList.add('time-slot');
                slotElement.textContent = slot;
                if (bookedSlotsForDay.includes(slot)) {
                    slotElement.classList.add('booked');
                    const sessionName = bookedSessions[currentDate][slot];
                    slotElement.setAttribute('data-session', `Booked: ${sessionName}`);
                } else {
                    slotElement.addEventListener('click', () => selectTimeSlot(slotElement));
                }
                timeSlotsContainer.appendChild(slotElement);
            });
        }

function selectDate(year, month, day) {
    selectedDate = new Date(year, month, day);
    document.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('selected'));
    event.target.classList.add('selected');
    selectedDateSpan.textContent = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    scheduleDate.textContent = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    createTimeSlots();
    updateSchedule();
}

function selectTimeSlot(slotElement) {
    document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
    slotElement.classList.add('selected');
    selectedTimeSlot = slotElement.textContent;
    continueBtn.disabled = false;
}

function updateSchedule() {
    scheduleContainer.innerHTML = '';
    const scheduleItems = [
        { time: '09:00-10:00', activity: 'consultation' },
        { time: '15:00-16:30', activity: 'UX course lesson' }
    ];

    scheduleItems.forEach(item => {
        const scheduleItem = document.createElement('div');
        scheduleItem.classList.add('schedule-item');
        scheduleItem.textContent = `${item.time} — ${item.activity}`;
        scheduleContainer.appendChild(scheduleItem);
    });
}

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    createCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    createCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

continueBtn.addEventListener('click', () => {
    if (selectedDate && selectedTimeSlot) {
        alert(`Booking confirmed for ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} at ${selectedTimeSlot}`);
    }
});

createCalendar(currentDate.getFullYear(), currentDate.getMonth());
createTimeSlots();
updateSchedule();

