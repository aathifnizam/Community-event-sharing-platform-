import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, get, set, remove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const searchForm = document.getElementById('searchForm');
const editEventButton = document.getElementById('editEventButton');
const deleteEventButton = document.getElementById('deleteEventButton');
const eventDetails = document.getElementById('eventDetails');
const editEventForm = document.getElementById('editEventForm'); // Added to access edit form

let currentEventId = null; // To store the current event's id for editing

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const searchContactEmail = document.getElementById('searchContactEmail').value;
    const searchContactNumber = document.getElementById('searchContactNumber').value;
    
    try {
        const eventRef = ref(database, 'Event');
        const snapshot = await get(eventRef);

        if (snapshot.exists()) {
            const events = snapshot.val();
            let eventFound = false;

            for (const eventId in events) {
                const event = events[eventId];
                if (event.contactEmail === searchContactEmail && event.contactNumber === searchContactNumber) {
                    currentEventId = eventId; // Store the id of the found event
                    displayEventDetails(event);
                    eventFound = true;
                    break;
                }
            }

            if (!eventFound) {
                eventDetails.innerHTML = "<p>No event found.</p>";
                editEventButton.disabled = true;
                deleteEventButton.disabled = true;
            }
        } else {
            eventDetails.innerHTML = "<p>No events found.</p>";
            editEventButton.disabled = true;
            deleteEventButton.disabled = true;
        }
    } catch (error) {
        console.error('Error searching for event:', error);
    }
});

function displayEventDetails(event) {
    const { eventName, eventDate, eventTime, eventLocation, eventDescription, eventFormat, ticketOptions, contactNumber, contactEmail } = event;

    const eventHTML = `
        <p><strong>Event Name:</strong> ${eventName}</p>
        <p><strong>Date:</strong> ${eventDate}</p>
        <p><strong>Time:</strong> ${eventTime}</p>
        <p><strong>Location:</strong> ${eventLocation}</p>
        <p><strong>Description:</strong> ${eventDescription}</p>
        <p><strong>Event Format:</strong> ${eventFormat}</p>
        <p><strong>Ticket Options:</strong> ${ticketOptions}</p>
        <p><strong>Contact Number:</strong> ${contactNumber}</p>
        <p><strong>Contact Email:</strong> ${contactEmail}</p>
    `;

    eventDetails.innerHTML = eventHTML;
    editEventButton.disabled = false;
    deleteEventButton.disabled = false;

    editEventButton.addEventListener('click', () => {
        // Populate the edit form fields with current event details for editing
        editEventForm.eventName.value = eventName;
        editEventForm.eventDate.value = eventDate;
        editEventForm.eventTime.value = eventTime;
        editEventForm.eventLocation.value = eventLocation;
        editEventForm.eventDescription.value = eventDescription;
        editEventForm.eventFormat.value = eventFormat;
        editEventForm.ticketOptions.value = ticketOptions;
        editEventForm.contactNumber.value = contactNumber;
        editEventForm.contactEmail.value = contactEmail;

        // Show the edit form
        document.getElementById('editForm').style.display = 'block';
    });

    deleteEventButton.addEventListener('click', async () => {
        // Implement delete functionality
        if (confirm("Are you sure you want to delete this event?")) {
            try {
                const eventRef = ref(database, `Event/${currentEventId}`);
                await remove(eventRef);
                alert("Event deleted successfully.");
                eventDetails.innerHTML = ""; // Clear event details after deletion
                editEventButton.disabled = true;
                deleteEventButton.disabled = true;
                document.getElementById('editForm').style.display = 'none'; // Hide edit form after deletion
            } catch (error) {
                console.error('Error deleting event:', error);
                alert("Error deleting event. Please try again later.");
            }
        }
    });
}

// Edit Form Submission Handling
editEventForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedEvent = {
        eventName: editEventForm.eventName.value,
        eventDate: editEventForm.eventDate.value,
        eventTime: editEventForm.eventTime.value,
        eventLocation: editEventForm.eventLocation.value,
        eventDescription: editEventForm.eventDescription.value,
        eventFormat: editEventForm.eventFormat.value,
        ticketOptions: editEventForm.ticketOptions.value,
        contactNumber: editEventForm.contactNumber.value,
        contactEmail: editEventForm.contactEmail.value
    };

    try {
        const eventRef = ref(database, `Event/${currentEventId}`);
        await set(eventRef, updatedEvent);
        alert("Event updated successfully.");
        document.getElementById('editForm').style.display = 'none'; // Hide edit form after update
    } catch (error) {
        console.error('Error updating event:', error);
        alert("Error updating event. Please try again later.");
    }
});
