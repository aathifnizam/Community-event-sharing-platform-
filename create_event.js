import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";


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
  
  // Function to handle form submission
  function submitForm(event) {
      event.preventDefault(); // Prevent form from submitting normally
  
      // Get form data
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
  
      // Store data in Firebase
      const newEntryRef = push(ref(database, `Event/`));
      set(newEntryRef, {
     
          eventName: eventName,
          eventDate: eventDate,
          eventDescription: eventDescription,
          eventFormat: eventFormat,
          eventLocation: eventLocation,
          link:link,
          eventTime: eventTime,
          ticketOptions: ticketOptions,
          contactNumber:contactNumber,
          contactEmail:contactEmail,
      }).then(() => {
          console.log('Data stored successfully');
          alert("Event Registered");
          // Optionally, you can redirect the user or show a success message
          document.getElementById('createEventForm').reset();
      }).catch((error) => {
          console.error('Error storing data:', error);
      });
  }
  
  
  document.getElementById('createEventForm').addEventListener('submit', submitForm);

  document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
        const index = inputs.indexOf(document.activeElement);
        if (index > -1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
            e.preventDefault();
        }
    }
});