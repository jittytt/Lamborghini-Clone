import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

const signupEmailIn = document.getElementById("email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignupPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

var signupEmail, signupPassword, confirmSignupPassword;

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
      })
      .catch((error) => {
        window.alert("Error occured! Try Again!");
      });
  }
});
