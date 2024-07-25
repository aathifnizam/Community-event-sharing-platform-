// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Firebase configuration
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
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const signupButton = document.getElementById('signup-button');

// Validate email and password
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  return password.length >= 6; // Ensure password is at least 6 characters long
}

// Sign Up
signupButton.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!validatePassword(password)) {
    alert('Password should be at least 6 characters long.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log('User signed up:', user);
      window.location.href = 'home.html'; // Redirect to home.html
    })
    .catch((error) => {
      console.error('Error signing up:', error);
      alert(`Error signing up: ${error.message}`);
    });
});
function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  const toggleBtn = input.nextElementSibling;

  if (input.type === 'password') {
    input.type = 'text';
    toggleBtn.textContent = 'Hide';
  } else {
    input.type = 'password';
    toggleBtn.textContent = 'Show';
  }
}
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