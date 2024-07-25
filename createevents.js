
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
// Your JavaScript code here

const firebaseConfig = {
    apiKey: "AIzaSyAzkLvq8nlfLu8pEnCkvrLNFiVDcmwz5YU",
    authDomain: "homcesp.firebaseapp.com",
    databaseURL: "https://homcesp-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "homcesp",
    storageBucket: "homcesp.appspot.com",
    messagingSenderId: "418786032281",
    appId: "1:418786032281:web:de8cd5eb22666e1ad9d608",
    measurementId: "G-SLSB3L6CXY"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)

  const database = getDatabase(app);


   
        //form.addEventListener('submit', (e) => {
        //e.preventDefault(); // Prevent the default form submission

        // Get form data
function submitForm(){
        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventTime = document.getElementById('eventTime').value;
        const eventLocation = document.getElementById('eventLocation').value;
        const eventDescription = document.getElementById('eventDescription').value;
        const eventFormat = document.getElementById('eventFormat').value;
        const ticketOptions = document.getElementById('ticketOptions').value;
        const contactNumber = document.getElementById('contactNumber').value;
        const contactEmail = document.getElementById('contactEmail').value;

        // Store data in Firebase
        const newEntryRef = push(ref(database, `Event/`));
        set(newEntryRef, {
          eventName:eventName,
          eventDate:eventDate,
          eventDescription:eventDescription,
          eventFormat:eventFormat,
          eventLocation:eventLocation,
          eventTime:eventTime,
          ticketOptions:ticketOptions,
          contactNumber:contactNumber,
          contactEmail:contactEmail,
        }).then(() => {
          console.log('Data stored successfully');
          alert("Booked");
          // Optionally, you can redirect the user or show a success message
        }).catch((error) => {
          console.error('Error storing data:', error);
        });
    }  
document.getElementById('createEventForm').addEventListener('submit',submitForm);

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