import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {firebaseConfig} from "./environment.js";
 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
 
const emailInput = document.getElementById('email');
const sendButton = document.getElementById('submit');
 
sendButton.addEventListener('click', () => {
    const email = emailInput.value;
 
 
// Function to check if email exists in Firebase Authentication
sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent.");
      // You can redirect the user to a confirmation page or show a success message
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error:", errorCode, errorMessage);
      // Display error message to the user
    });
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