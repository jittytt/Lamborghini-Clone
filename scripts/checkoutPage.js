import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
    console.log("display function")
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
          document.getElementById('fname').value=addresses[len-1].First_Name;
          document.getElementById('lname').value=addresses[len-1].Last_Name;
          document.getElementById('city').value=addresses[len-1].City;
          document.getElementById('zipcode').value=addresses[len-1].Zipcode;
          document.getElementById('address').value=addresses[len-1].Address;
          document.getElementById('phone').value=addresses[len-1].Phone;
          document.getElementById('state').value=addresses[len-1].State;
          document.getElementById('country').value=addresses[len-1].Country;
  
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

//empty data check(disable button)
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('section');
    const submitButton = document.getElementById('shipAddress');
    displayAddress();

    const isFormValid = () => {
        // Check the validity of all required form fields
        const requiredFields = form.querySelectorAll('[required]');
        const isValid = Array.from(requiredFields).every((element) => element.checkValidity());
        return isValid;
    };

    form.addEventListener('input', function () {
        // Check if the entire form is valid
        const isValid = isFormValid();

        submitButton.classList.toggle('active', isValid);
    });

});
document.getElementById('shipAddress').addEventListener('click', async function () {
    // Get data from form fields
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var zipcode = document.getElementById('zipcode').value;
    var country = document.getElementById('country').value;
    var state = document.getElementById('state').value;
    var phone = document.getElementById('phone').value;
    const email = await getEmailFromActiveUser();
    console.log("saving email:"+email);
    if (email) {
        console.log(email)
        // Modify the structure of mapData
        const mapData = {
            First_Name: fname,
            Last_Name: lname,
            Address: address,
            City: city,
            Zipcode: zipcode,
            Country: country,
            State: state,
            Phone: phone,
        };

        // Add the user's address to Firestore
        addMapToAddress(email, mapData);
    } else {
        console.error("Email not found in ActiveUser collection");
    }
});

async function addMapToAddress(email, mapData) {
    const userDocRef = doc(db, "UsersData", email);

    try {
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
            const currentAddress = docSnapshot.data().Address || [];

            // Append the new mapData to the currentAddress array
            const updatedAddress = [...currentAddress, mapData];

            // Update the document with the modified Address array
            await updateDoc(userDocRef, { Address: updatedAddress });

            console.log("Map added successfully!");
            window.location.href="../pages/checkout_shipping_method.html"
        } else {
            console.error("Document not found for email:", email);
        }
    } catch (error) {
        console.error("Error updating document:", error);
    }
}
