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

      // Save email to ActiveUser collection
      updateEmailInActiveUser(email)
        .then(() => {
          console.log("Success! Welcome Back");
        })
        .catch((error) => {
          console.error("Error updating email in ActiveUser:", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode);
      console.error("Error Occurred! Try Again");
    });
});

async function updateEmailInActiveUser(email) {
  const activeUserDocRef = doc(db, "ActiveUser", "Email_ID");

  try {
    // Update the document with the new email
    await setDoc(activeUserDocRef, { Email: email });

    // Save email to sessionStorage if needed
    sessionStorage.setItem('Email', email);
  } catch (error) {
    throw error;
  }
}
