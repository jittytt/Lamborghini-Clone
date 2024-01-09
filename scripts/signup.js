import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { userKey, firebaseConfig, service_id, template_id} from "./environment.js";


 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
 
const signupEmailIn = document.getElementById("email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignupPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
var signupEmail, signupPassword, confirmSignupPassword;

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('form ');
  const submitButton = document.getElementById('create-acct-btn');

  const isFormValid = () => {
      // Check the validity of all required form fields
      const requiredFields = form.querySelectorAll('[required]');
      const isValid = Array.from(requiredFields).every((element) => element.checkValidity());
      return isValid;
  };

  form.addEventListener('input', function () {
      // Check if the entire form is valid
      const isValid = isFormValid();
      submitButton.style.pointerEvents='auto';
  });
})
 
createacctbtn.addEventListener("click", async function(event) {
 
  event.preventDefault();
 
  var isVerified = true;
 
  signupEmail = signupEmailIn.value;
  signupPassword = signupPasswordIn.value;
  confirmSignupPassword = confirmSignupPasswordIn.value;
 
  if(signupEmail == null || signupPassword == null || confirmSignupPassword == null)
  {
    const errorDiv = document.querySelector(".error");
    const errorTitle = document.querySelector(".error__title");
    errorTitle.textContent = "Please fill out all required fields.";
    errorDiv.style.display = "flex";

      // Set timeout to hide the error div after 1 second
     setTimeout(() => {
    errorDiv.style.display = "none";
  }, 1000);
    isVerified = false;
  }
 
  if(isVerified)
  {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
        const user = userCredential.user;
 
        //window.alert("Success! Account created");
        const errorDiv = document.querySelector(".error");
        const errorTitle = document.querySelector(".error__title");
        errorTitle.textContent = "Success! Account created";
        errorDiv.style.backgroundColor = "green";
        errorDiv.style.display = "flex";
  
          // Set timeout to hide the error div after 1 second
         setTimeout(() => {
        errorDiv.style.display = "none";
      }, 1000);
        // Call the function to create user data in Firestore
      createUserData(signupEmailIn.value, firstName.value, lastName.value);

      })
      .catch((error) => {
        console.log(error);
        //window.alert("Error occured! Try Again!");
        const errorDiv = document.querySelector(".error");
        const errorTitle = document.querySelector(".error__title");
        errorTitle.textContent = "Invalid Credentials";
        errorDiv.style.display = "flex";
  
          // Set timeout to hide the error div after 1 second
         setTimeout(() => {
        errorDiv.style.display = "none";
      }, 1000);
      });
  }

  
    
     emailjs.init(userKey);
   
     const templateParams = {
       to_email: signupEmailIn.value,
       to_name: firstName.value,
     };
   
     emailjs.send(service_id, template_id, templateParams)
       .then(response => {
         console.log('Email sent successfully:', response);
       })
       .catch(error => {
         console.error('Error sending email:', error);
       });
  
});


function createUserData(email, firstName, lastName) {
  // Collection reference
  const usersDataCollection = collection(db, "UsersData");

  // Document reference with email as the document name
  const userDocRef = doc(usersDataCollection, email);

  // Data to be added to the document
  const userData = {
    First_Name: firstName,
    Last_Name: lastName,
    Email_ID: email,
    Address: [],
    Wishlist: [], 
    Cart: [], 
    TotalCost : 0,
    Orders: {}, 

  };

  // Set the data in the document
  setDoc(userDocRef, userData)
    .then(() => {
      console.log("User data created successfully");
      window.location.href = '../pages/login.html';
    })
    .catch((error) => {
      console.error("Error creating user data:", error);
    });
}



document.getElementById("firstname").addEventListener("focus", function () {
  var placeholderLabel = document.querySelector(
    ".firstname-placeholder-label"
  );
  placeholderLabel.style.top = "-5%";
  placeholderLabel.style.fontSize = "10px";
});

//Function to revert animated password field placeholder text
document.getElementById("firstname").addEventListener("blur", function () {
var placeholderLabel = document.querySelector(".firstname-placeholder-label");
// Revert the styles when focus is lost
if (!this.value) {
  placeholderLabel.style.top = "5%";
  placeholderLabel.style.fontSize = "14px";
}
});

document.getElementById("lastname").addEventListener("focus", function () {
  var placeholderLabel = document.querySelector(
    ".lastname-placeholder-label"
  );
  placeholderLabel.style.top = "-5%";
  placeholderLabel.style.fontSize = "10px";
});

//Function to revert animated password field placeholder text
document.getElementById("lastname").addEventListener("blur", function () {
var placeholderLabel = document.querySelector(".lastname-placeholder-label");
// Revert the styles when focus is lost
if (!this.value) {
  placeholderLabel.style.top = "5%";
  placeholderLabel.style.fontSize = "14px";
}
});

document.getElementById("email-signup").addEventListener("focus", function () {
  var placeholderLabel = document.querySelector(
    ".email-placeholder-label"
  );
  placeholderLabel.style.top = "-5%";
  placeholderLabel.style.fontSize = "10px";
});

//Function to revert animated password field placeholder text
document.getElementById("email-signup").addEventListener("blur", function () {
var placeholderLabel = document.querySelector(".email-placeholder-label");
// Revert the styles when focus is lost
if (!this.value) {
  placeholderLabel.style.top = "5%";
  placeholderLabel.style.fontSize = "14px";
}
});

document.getElementById("password-signup").addEventListener("focus", function () {
  var placeholderLabel = document.querySelector(
    ".password-placeholder-label"
  );
  placeholderLabel.style.top = "-5%";
  placeholderLabel.style.fontSize = "10px";
});

//Function to revert animated password field placeholder text
document.getElementById("password-signup").addEventListener("blur", function () {
var placeholderLabel = document.querySelector(".password-placeholder-label");
// Revert the styles when focus is lost
if (!this.value) {
  placeholderLabel.style.top = "5%";
  placeholderLabel.style.fontSize = "14px";
}
});

document.getElementById("confirm-password-signup").addEventListener("focus", function () {
  var placeholderLabel = document.querySelector(
    ".confirmpassword-placeholder-label"
  );
  placeholderLabel.style.top = "-5%";
  placeholderLabel.style.fontSize = "10px";
});

//Function to revert animated password field placeholder text
document.getElementById("confirm-password-signup").addEventListener("blur", function () {
var placeholderLabel = document.querySelector(".confirmpassword-placeholder-label");
// Revert the styles when focus is lost
if (!this.value) {
  placeholderLabel.style.top = "5%";
  placeholderLabel.style.fontSize = "14px";
}
});