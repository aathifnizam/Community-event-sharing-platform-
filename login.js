// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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
const loginDiv = document.getElementById('login-div');
const userDiv = document.getElementById('user-div');
const userName = document.getElementById('user-name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');

// Validate email and password
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  return password.length >= 6; // Ensure password is at least 6 characters long
}

// Login
loginButton.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!validatePassword(password)) {
    alert('Password should be at least 6 characters long.');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('User signed in:', user);
      window.location.href = 'home.html'; // Redirect to home.html
    })
    .catch((error) => {
      console.error('Error signing in:', error);
      alert(`Error signing in: ${error.message}`);
    });
});

// Logout
logoutButton.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log('User signed out');
    window.location.href = 'login.html'; // Redirect to index.html after logout if needed
  }).catch((error) => {
    console.error('Error signing out:', error);
    alert(`Error signing out: ${error.message}`);
  });
});

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    loginDiv.style.display = 'none';
    userDiv.style.display = 'block';
    userName.textContent = user.email;
  } else {
    // User is signed out
    loginDiv.style.display = 'block';
    userDiv.style.display = 'none';
  }
});
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

  








