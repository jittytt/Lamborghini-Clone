import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

console.log("razor loaded");
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

//clear cart 
async function clearCart() {
  console.log("clearing cart");
  const email = await getEmailFromActiveUser();
  console.log(email);
  
  
  if (!email) {
    console.error("Email not found in session storage");
    return;
  }

  // Reference to the Firestore collection
  const usersDataCollection = collection(db, "UsersData");
  const userDocRef = doc(usersDataCollection, email);

  try {
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // Document found, fetch the cart array
      const cart = userDoc.data().Cart;

      // Clear the cart by updating the document
      await updateDoc(userDocRef, { Cart: [] });

      console.log("Cart successfully cleared.");
    } else {
      console.error("Document not found for user email: ", email);
    }
  } catch (error) {
    console.error("Error fetching or updating document: ", error);
  }
  window.location.href = `addressbook.html` 
}

//payment integration function
window.makepayment = () => {const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount');
     var options = {
        "key": "rzp_test_pyOyM0RD5UE7IF",
        "amount": amount*100, // Example: 2000 paise = INR 20
        "name": "LAMBORGHINI",
        "description": "description",
        "image": "../assets/logo.png",// COMPANY LOGO
        "handler": function (response) {
            console.log(response);
            clearCart();
            alert("Order successfully placed");
            
            // AFTER TRANSACTION IS COMPLETE YOU WILL GET THE RESPONSE HERE.
        },
        "prefill": {
            "name": "BOBY", // pass customer name
            "email": 'bobybenny888@gmail.com',// customer email
            "contact": '+919123456780' //customer phone no.
        },
        "notes": {
            "address": "address" //customer address 
        },
        "theme": {
            "color": "#15b8f3" // screen color
        }
    };
    console.log(options);
    var propay = new Razorpay(options);
    propay.open();
};

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