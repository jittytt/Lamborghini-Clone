import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {firebaseConfig} from "./environment.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

async function  displayAddress() {
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
          const email = doc.data().Email_ID;
          const firstname = doc.data().First_Name;
          const lastname = doc.data().Last_Name;
          console.log("Data Found",email,firstname,lastname);
          var uppercaseFirstname = firstname.toUpperCase();

           document.getElementById('loginusername').innerHTML=uppercaseFirstname;
           document.getElementById('userfirstname').innerHTML=firstname;
           document.getElementById('userlastname').innerHTML=lastname;
           document.getElementById('useremailid').innerHTML=email;

 
        } else {
          console.error("Document not found for user email: ", email);
        }
      })
      .catch((error) => {
        console.error("Error fetching document: ", error);
      });
}
window.onload = displayAddress;



