import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {firebaseConfig} from "./environment.js";

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
          validateEmail(email);
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
         }, 2000); 

    });
    if( validateEmail(email)){

    fetchSignInMethodsForEmail(auth, email)
        .then((signInMethods) => {
          if (signInMethods.length === 0) {
            console.log(signInMethods);
            console.log("Email is not registered.");
            window.location.href = "../pages/register.html";
          } else {
            console.log("Email is already registered.");
          }
        })
        .catch((error) => {
          console.error("Error checking email:", error);
        });
    }


});

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}




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
