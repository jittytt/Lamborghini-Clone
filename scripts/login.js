import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGO_Xor9wnAG6fZguRtNf-glJekc3u0qA",
  authDomain: "lamborghini-store-19cb4.firebaseapp.com",
  projectId: "lamborghini-store-19cb4",
  storageBucket: "lamborghini-store-19cb4.appspot.com",
  messagingSenderId: "123605469618",
  appId: "1:123605469618:web:70da09f3d62d69b39abcab",
  measurementId: "G-MEBX1PZLTS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const submitButton = document.getElementById("submit");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateEmailInActiveUser(email)
        .then(() => {
          console.log("Success! Welcome Back");
        })
        .catch((error) => {
          console.error("Error updating email in ActiveUser:", error);
          alert("Invalid Credentials");
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      //const errorMessage = error.message;
      console.log(errorCode);
      console.log("Error Occured! Try Again");
      const errorDiv = document.querySelector(".error");
      const errorTitle = document.querySelector(".error__title");
      errorTitle.textContent = "Invalid username or password";
      errorDiv.style.display = "flex";

        // Set timeout to hide the error div after 1 second
       setTimeout(() => {
      errorDiv.style.display = "none";
         }, 1000); // Hide after 1 second
    });
});

async function updateEmailInActiveUser(email) {
  const activeUserDocRef = doc(db, "ActiveUser", "Email_ID");

  try {
    await setDoc(activeUserDocRef, { Email: email });
    window.location.href = '../index.html';
  } catch (error) {
    throw error;
  }
}



document.getElementById("password").addEventListener("focus", function () {
    var placeholderLabel = document.querySelector(
      ".password-placeholder-label"
    );
    placeholderLabel.style.top = "30%";
    placeholderLabel.style.fontSize = "12px";
  });

//Function to revert animated password field placeholder text
document.getElementById("password").addEventListener("blur", function () {
  var placeholderLabel = document.querySelector(".password-placeholder-label");
  // Revert the styles when focus is lost
  if (!this.value) {
    placeholderLabel.style.top = "50%";
    placeholderLabel.style.fontSize = "14px";
  }
});

document.getElementById("email").addEventListener("focus", function () {
  var placeholderLabel = document.querySelector(
    ".email-placeholder-label"
  );
  placeholderLabel.style.top = "30%";
  placeholderLabel.style.fontSize = "12px";
});

//Function to revert animated password field placeholder text
document.getElementById("email").addEventListener("blur", function () {
var placeholderLabel = document.querySelector(".email-placeholder-label");
// Revert the styles when focus is lost
if (!this.value) {
  placeholderLabel.style.top = "50%";
  placeholderLabel.style.fontSize = "14px";
}
});
