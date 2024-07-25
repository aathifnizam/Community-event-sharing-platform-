// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Firebase configuration (same as before)
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
const auth = getAuth(app);

// DOM elements
const emailInput = document.getElementById('email');
const resetButton = document.getElementById('reset-button');

// Validate email function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Reset password button click event
resetButton.addEventListener('click', () => {
  const email = emailInput.value;

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent successfully
      alert('Password reset email sent. Check your inbox.');
      window.location.href = 'login.html'; // Redirect to login page
    })
    .catch((error) => {
      console.error('Error sending password reset email:', error);
      alert(`Error sending password reset email: ${error.message}`);
    });
});
