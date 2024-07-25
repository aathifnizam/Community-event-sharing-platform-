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

// Function to sign out the user
function logout() {
  signOut(auth).then(() => {
    console.log('User signed out');
    window.location.href = 'index.html'; // Redirect to index.html after logout
  }).catch((error) => {
    console.error('Error signing out:', error);
    alert(`Error signing out: ${error.message}`);
  });
}

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  const loginDiv = document.getElementById('login-div');
  const userDiv = document.getElementById('user-div');
  const userName = document.getElementById('user-name');

  if (user) {
    // User is signed in
    if (loginDiv && userDiv && userName) {
      loginDiv.style.display = 'none';
      userDiv.style.display = 'block';
      userName.textContent = user.email;
    }
  } else {
    // User is signed out
    if (loginDiv && userDiv) {
      loginDiv.style.display = 'block';
      userDiv.style.display = 'none';
    }
  }
});

export { auth, logout };
