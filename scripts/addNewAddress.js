import { doc, getDoc, updateDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {firebaseConfig} from "./environment.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log(app);
console.log(db);
//check if all values entered
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('div ');
    const submitButton = document.getElementById('saveAddress');

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

//save into firebase
document.getElementById('saveAddress').addEventListener('click', async function () {
    // Get data from form fields
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var zipcode = document.getElementById('zipcode').value;
    var country = document.getElementById('country').value;
    var state = document.getElementById('state').value;
    var phone = document.getElementById('phone').value;

    console.log(fname);
    // Retrieve email from ActiveUser collection
    const email = await getEmailFromActiveUser();
    console.log(email)
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

            //Alert success
            const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
            const appendAlert = (message, type) => {
            const wrapper = document.createElement('div')
            wrapper.innerHTML = [
                `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                `   <div>${message}</div>`,
                '</div>'
            ].join('')

            alertPlaceholder.append(wrapper);
            //goto resulting page
            setTimeout(function() {
                console.log('Page will after in 2 seconds.');
                window.location.href = `../pages/addressbook.html`;
            }, 2000); 
            }
            appendAlert('Address added successfully', 'success');

        } else {
            console.error("Document not found for email:", email);
        }
    } catch (error) {
        console.error("Error updating document:", error);
    }
}
// https://mocki.io/v1/4f87cd3b-a9ad-411e-bbea-e42228282769