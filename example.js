// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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
const signupButton = document.getElementById('signup-button');
const logoutButton = document.getElementById('logout-button');

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

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!validatePassword(password)) {
    alert('Password should be at least 6 characters long.');
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




<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>community event sharing platform</title>
  <link rel="stylesheet" href="login.css">
  <script type="module" src="login.js"></script>
</head>
<body>
  <div class="container">
    <h1>community event sharing platform</h1>
    <div id="user-div">
      <h2>Are you sure you want to sign out? <span id="user-name"></span>!</h2>
      <button id="logout-button">Logout</button>
    </div>
    <div id="login-div">
      <input type="email" id="email" placeholder="Email">
      <input type="password" id="password" placeholder="Password">
      <button id="login-button">Login</button>
      <button id="signup-button">Sign Up</button>
    </div>
  </div>
</body>
</html>










body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f0f0f0;
  }
  
  .container {
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  #user-div {
    display: none;
  }
  