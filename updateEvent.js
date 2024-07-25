import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, get, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

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

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const searchEventName = document.getElementById('searchEventName').value;
    const searchEmail = document.getElementById('searchEmail').value;

    const eventsRef = ref(database, 'Event');
    const eventQuery = query(eventsRef, orderByChild('contactEmail').equalTo(searchEmail));

    get(eventQuery).then((snapshot) => {
        let eventFound = false;
        snapshot.forEach((childSnapshot) => {
            const eventData = childSnapshot.val();
            if (eventData.eventName === searchEventName) {
                eventFound = true;
                populateUpdateForm(childSnapshot.key, eventData);
            }
        });

        if (!eventFound) {
            alert('No event found with the specified name and email.');
        }
    }).catch((error) => {
        console.error('Error fetching data:', error);
    });
});

function populateUpdateForm(eventId, eventData) {
    document.getElementById('eventId').value = eventId;
    document.getElementById('eventName').value = eventData.eventName;
    document.getElementById('eventDate').value = eventData.eventDate;
    document.getElementById('eventTime').value = eventData.eventTime;
    document.getElementById('eventLocation').value = eventData.eventLocation;
    document.getElementById('link').value = eventData.link;
    document.getElementById('eventDescription').value = eventData.eventDescription;
    document.getElementById('eventFormat').value = eventData.eventFormat;
    document.getElementById('ticketOptions').value = eventData.ticketOptions;
    document.getElementById('contactNumber').value = eventData.contactNumber;
    document.getElementById('contactEmail').value = eventData.contactEmail;

    document.getElementById('updateEventForm').style.display = 'block';
}

document.getElementById('updateEventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const eventId = document.getElementById('eventId').value;
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventLocation = document.getElementById('eventLocation').value;
    const link = document.getElementById('link').value;
    const eventDescription = document.getElementById('eventDescription').value;
    const eventFormat = document.getElementById('eventFormat').value;
    const ticketOptions = document.getElementById('ticketOptions').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const contactEmail = document.getElementById('contactEmail').value;

    const eventRef = ref(database, `Event/${eventId}`);
    set(eventRef, {
        eventName: eventName,
        eventDate: eventDate,
        eventTime: eventTime,
        eventLocation: eventLocation,
        link: link,
        eventDescription: eventDescription,
        eventFormat: eventFormat,
        ticketOptions: ticketOptions,
        contactNumber: contactNumber,
        contactEmail: contactEmail,
    }).then(() => {
        console.log('Data updated successfully');
        alert("Event Updated");
        document.getElementById('updateEventForm').reset();
        document.getElementById('updateEventForm').style.display = 'none';
    }).catch((error) => {
        console.error('Error updating data:', error);
    });
});