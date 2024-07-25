// join_events.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAsfaD_FZjdkNvNaT1KLqDSatFqdpK8vO4",
    authDomain: "create-d664a.firebaseapp.com",
    databaseURL: "https://create-d664a-default-rtdb.firebaseio.com",
    projectId: "create-d664a",
    storageBucket: "create-d664a.appspot.com",
    messagingSenderId: "599439640560",
    appId: "1:599439640560:web:d93351219212b43482bf35",
    measurementId: "G-BHBY41BYPY"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const eventsContainer = document.getElementById('eventsContainer');

function createEventCard(event) {
    const eventCard = document.createElement('div');
    eventCard.className = 'eventCard';
    eventCard.innerHTML = `
        <h2>${event.eventName}</h2>
        <p><strong>Date:</strong> ${event.eventDate}</p>
        <p><strong>Time:</strong> ${event.eventTime}</p>
        <p><strong>Location:</strong> ${event.eventLocation}</p>
        <p>${event.eventDescription}</p>
        <p><a href="${event.link}" target="_blank">Register Here</a></p>
        <p><strong>Contact:</strong>  ${event.contactEmail}</p>
    `;

    eventCard.addEventListener('mouseenter', () => {
        eventCard.style.transform = 'translateY(-5px)';
    });

    eventCard.addEventListener('mouseleave', () => {
        eventCard.style.transform = 'translateY(0)';
    });

    return eventCard;
}

function fetchAndDisplayEvents(startDate = '', endDate = '', searchTerm = '') {
    const eventsRef = ref(database, 'Event/');
    onValue(eventsRef, (snapshot) => {
        eventsContainer.innerHTML = ''; // Clear previous content
        const events = snapshot.val();
        for (const id in events) {
            const event = events[id];
            if (isEventWithinDateRange(event, startDate, endDate) && event.eventName.toLowerCase().includes(searchTerm.toLowerCase())) {
                const eventCard = createEventCard(event);
                eventsContainer.appendChild(eventCard);
            }
        }
    });
}

function filterEventsByDate() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    fetchAndDisplayEvents(startDate, endDate, document.getElementById('searchInput').value);
}

function searchEvents() {
    const searchTerm = document.getElementById('searchInput').value;
    fetchAndDisplayEvents(document.getElementById('startDate').value, document.getElementById('endDate').value, searchTerm);
}

function debounceSearch() {
    clearTimeout(debounceSearch.timeout);
    debounceSearch.timeout = setTimeout(searchEvents, 300); // Adjust the debounce time as needed
}

function isEventWithinDateRange(event, startDate, endDate) {
    const eventDate = new Date(event.eventDate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    // Check if eventDate is within the range
    if ((start && eventDate < start) || (end && eventDate > end)) {
        return false;
    }
    return true;
}

// Initial fetch and display of events
fetchAndDisplayEvents();

// Export the functions
export { filterEventsByDate, searchEvents, debounceSearch };
