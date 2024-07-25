<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCiJzmn79PmGBJ20_0xVGG-SFaWsYePB8g",
    authDomain: "communitylogin-c233c.firebaseapp.com",
    projectId: "communitylogin-c233c",
    storageBucket: "communitylogin-c233c.appspot.com",
    messagingSenderId: "66432032464",
    appId: "1:66432032464:web:ee3c28c8cd3d5cd87f08d5",
    measurementId: "G-XTFTVE5MQ1"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  const submitButton = document.getElementById("submit");
  const signupButton = document.getElementById("sign-up");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const main = document.getElementById("main");
  const createacct = document.getElementById("create-acct");

  const signupEmailIn = document.getElementById("email-signup");
  const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
  const signupPasswordIn = document.getElementById("password-signup");
  const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
  const createacctbtn = document.getElementById("create-acct-btn");

  const returnBtn = document.getElementById("return-btn");

  let email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

  // Event listener for account creation
  createacctbtn.addEventListener("click", () => {
    let isVerified = true;

    signupEmail = signupEmailIn.value;
    confirmSignupEmail = confirmSignupEmailIn.value;
    signupPassword = signupPasswordIn.value;
    confirmSignUpPassword = confirmSignUpPasswordIn.value;

    // Email and password match validation
    if (signupEmail !== confirmSignupEmail) {
      window.alert("Email fields do not match. Try again.");
      isVerified = false;
    }

    if (signupPassword !== confirmSignUpPassword) {
      window.alert("Password fields do not match. Try again.");
      isVerified = false;
    }

    // Check for empty fields
    if (!signupEmail || !confirmSignupEmail || !signupPassword || !confirmSignUpPassword) {
      window.alert("Please fill out all required fields.");
      isVerified = false;
    }

    // Create account if all fields are verified
    if (isVerified) {
      createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
        .then((userCredential) => {
          // Signed in 
          window.alert("Success! Account created.");
        })
        .catch((error) => {
          window.alert(`Error: ${error.message}`);
        });
    }
  });

  // Event listener for sign in
  submitButton.addEventListener("click", () => {
    email = emailInput.value;
    password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        window.alert("Success! Welcome back!");
      })
      .catch((error) => {
        window.alert(`Error: ${error.message}`);
      });
  });

  // Switch to sign-up form
  signupButton.addEventListener("click", () => {
    main.style.display = "none";
    createacct.style.display = "block";
  });

  // Return to login form
  returnBtn.addEventListener("click", () => {
    main.style.display = "block";
    createacct.style.display = "none";
  });
</script>
