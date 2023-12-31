import { doc, getDoc, updateDoc, getFirestore} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGO_Xor9wnAG6fZguRtNf-glJekc3u0qA",
    authDomain: "lamborghini-store-19cb4.firebaseapp.com",
    projectId: "lamborghini-store-19cb4",
    storageBucket: "lamborghini-store-19cb4.appspot.com",
    messagingSenderId: "123605469618",
    appId: "1:123605469618:web:70da09f3d62d69b39abcab",
    measurementId: "G-MEBX1PZLTS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('saveAddress').addEventListener('click', function () {
    // Get data from form fields
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var zipcode = document.getElementById('zipcode').value;
    var country = document.getElementById('country').value;
    var state = document.getElementById('state').value;
    var phone = document.getElementById('phone').value;
    var email = "mail@gmail.com";

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
        } else {
            console.error("Document not found for email:", email);
        }
    } catch (error) {
        console.error("Error updating document:", error);
    }
}


