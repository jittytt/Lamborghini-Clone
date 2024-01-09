import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { userKey, firebaseConfig, service_id, template_invoice_id} from "./environment.js";

//import { v4 as uuidv4 } from 'uuid';
console.log("razor loaded");

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//clear cart 
async function addOrdersClearCart() {
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
      const cart = await userDoc.data().Cart || [];
      const orders = await userDoc.data().Orders;
      const amount = await userDoc.data().TotalCost;
      const bill_email = userDoc.data().Email_ID;
      console.log(bill_email);
      const firstname = userDoc.data().First_Name;
      const date=new Date();
      const currentdate=(date.getDate()+"/"+date.getMonth() + 1+ "/"+date.getFullYear());
      const totalAmount=amount+28; //fixed shipping
      const cartProducts = [...cart];
      console.log(':cart fetched',cart);
      const newOrderId = generateUUID();
      console.log(newOrderId);

      // Add to "Orders" collection with a dynamically generated order ID
      console.log("Adding to my orders");
      const orderData = {
        order_id: newOrderId, // You can use any unique identifier here
        order_date: currentdate,
        total_cost: totalAmount,
        product_array: cartProducts 
      };
     
      const updatedOrder = {...orders, [newOrderId]: orderData };

      // Update the document and clear array
      await updateDoc(userDocRef, { Orders: updatedOrder, Cart: [] });

        console.log("Map added successfully!");
        
   emailjs.init(userKey);
   console.log("Hey I got inside emailjs function");

  const templateParams = {
    to_email: bill_email,
    to_name: firstname,
    message: newOrderId,
    to_payment:amount,
    to_total:totalAmount
  };

  emailjs.send(service_id, template_invoice_id, templateParams)
    .then(response => {
      console.log('Email sent successfully:', response);
    })
    .catch(error => {
      console.error('Error sending email:', error);
    });


      // // Clear the cart by updating the document
      // console.log("Clearing cart");
      // await updateDoc(userDocRef, { Cart: [] });
      // console.log("Cart successfully cleared.");
    } else {
      console.error("Document not found for user email: ", email);
    }
  } catch (error) {
    console.error("Error fetching or updating document: ", error);
  }

  alert("Order successfully placed");
  window.location.href = `addressbook.html`;
}


//payment integration function
window.makepayment = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount');
     var options = {
        "key": "rzp_test_YmH4Dk6I7ujP1G",
        "amount": amount*100, // Example: 2000 paise = INR 20
        "name": "LAMBORGHINI",
        "description": "description",
        "image": "../assets/logo.png",// COMPANY LOGO
        "handler": function (response) {
            console.log(response);
            addOrdersClearCart();
            
            
            // AFTER TRANSACTION IS COMPLETE YOU WILL GET THE RESPONSE HERE.
        },
        "prefill": {
            "name": "BOBY", // pass customer name
            "email": 'bobybenny888@gmail.com',// customer email
            "contact": '+917123456780' //customer phone no.
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

// const { v4: uuidv4 } = require('uuid');

function generateUUID() {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0].toString(16);
  //return uuidv4();
}
