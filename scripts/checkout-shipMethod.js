import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
let amount=0;
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

async function  displayAddress() {
    console.log("hii")
    const email = await getEmailFromActiveUser();
    console.log(email)
    if (!email) {
      console.error("Email not found in session storage");
      return;
    }
    // Reference to the Firestore collection
    const usersDataCollection = collection(db, "UsersData");
    const userDocRef = doc(usersDataCollection, email);
  
    getDoc(userDocRef)
      .then((doc) => {
        if (doc.exists()) {
          // Document found, fetch the addresses array
          const addresses = doc.data().Address;
          const len=addresses.length;
          console.log(len);
          console.log("Data Found",addresses[len-1]);
         document.getElementById('name').innerHTML=(addresses[len-1].First_Name+" "+addresses[len-1].Last_Name);
         document.getElementById('address').innerHTML=(addresses[len-1].Address);
         document.getElementById('zip').innerHTML=(addresses[len-1].Zipcode+", "+addresses[len-1].City+"("+addresses[len-1].State+")");
         document.getElementById('country').innerHTML=(addresses[len-1].Country);
         document.getElementById('number').innerHTML=(addresses[len-1].Phone);
  
        } else {
          console.error("Document not found for user email: ", email);
        }
      })
      .catch((error) => {
        console.error("Error fetching document: ", error);
      });
}

async function getEmailFromActiveUser() {
    const activeUserDocRef = doc(db, "ActiveUser", "Email_ID");

    try {
        const docSnapshot = await getDoc(activeUserDocRef);

        if (docSnapshot.exists()) {
            const emailFromFirestore = docSnapshot.data().Email;
            return emailFromFirestore;
        } else {
            console.error("Document not found in ActiveUser collection");
            return null;
        }
    } catch (error) {
        console.error("Error retrieving email from ActiveUser collection:", error);
        return null;
    }
}

function activateButton() {
  const nextButton = document.getElementById('nextButton');
  nextButton.style.pointerEvents="auto";
  nextButton.style.background="black";
  console.log('class added')
  nextButton.classList.add('active');
}



//empty data check(disable button)
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('div');
    //const submitButton = document.getElementById('shipAddress');
    displayAddress();
    console.log('call btn')
    activateButton();
    // const button = document.getElementById('nextButton');
    // button.classList.add('active');
    // Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Retrieve the value of the 'amount' parameter
amount = urlParams.get('amount');
document.getElementById('totalAmount').innerHTML=("$"+amount);
   

});


//next button
document.getElementById('nextButton').addEventListener('click', async function () {
  window.location.href = `../pages/checkout_payment.html?amount=${amount}`;

});
  
