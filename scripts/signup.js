import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
 
createacctbtn.addEventListener("click", function(event) {
 
  event.preventDefault();
 
  var isVerified = true;
 
  signupEmail = signupEmailIn.value;
  signupPassword = signupPasswordIn.value;
  confirmSignupPassword = confirmSignupPasswordIn.value;
 
  if(signupEmail == null || signupPassword == null || confirmSignupPassword == null)
  {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }
 
  if(isVerified)
  {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
        const user = userCredential.user;
 
        window.alert("Success! Account created");
        // Call the function to create user data in Firestore
      createUserData(signupEmailIn.value, firstName.value, lastName.value);

      })
      .catch((error) => {
        console.log(error);
        window.alert("Error occured! Try Again!");
      });
  }
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
    Wishlist: {}, // Array of {product_id: string, API_URL: string, count: number}
    Cart: [], // Array of {product_id: string, API_URL: string, count: number}
    TotalCost : 0
  };

  // Set the data in the document
  setDoc(userDocRef, userData)
    .then(() => {
      console.log("User data created successfully");
    })
    .catch((error) => {
      console.error("Error creating user data:", error);
    });
}