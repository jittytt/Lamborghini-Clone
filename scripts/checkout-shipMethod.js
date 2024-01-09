import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
let amount=0;
let divid=0;
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
          if (len==1){
          document.getElementById('single-address').classList.add('shippingMethod2');
         document.getElementById('name').innerHTML=(addresses[len-1].First_Name+" "+addresses[len-1].Last_Name);
         document.getElementById('address').innerHTML=(addresses[len-1].Address);
         document.getElementById('zip').innerHTML=(addresses[len-1].Zipcode+", "+addresses[len-1].City+"("+addresses[len-1].State+")");
         document.getElementById('country').innerHTML=(addresses[len-1].Country);
         document.getElementById('number').innerHTML=(addresses[len-1].Phone);
         activateButton();
          }
          else{
            document.getElementById('single-address').style.display = 'none';
            document.getElementById('single-address').classList.add('shipMethod1');
            const addressContainer = document.querySelector(".shippingMethod1");
            const btnContainer = document.querySelector(".shippIcon");
            const headding = document.createElement("h5");
            const newbtn = document.createElement("button");
            newbtn.classList.add('newbtn');
            newbtn.style.width='20%';
            // newbtn.style.marginLeft='17%';
            headding.innerHTML='Choose the shipping address';
            newbtn.innerHTML='+Add new address';
            newbtn.onclick=function () {
              window.location.href = `../pages/addNewAddress.html`;
            };
            addressContainer.appendChild(headding);
            btnContainer.appendChild(newbtn);
            addresses.forEach((address) => {
              displayAddressCard(address);
              document.getElementById('editpen').style.visibility = 'hidden';
            });
          }
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
function handleClick(event, divid) {
  console.log('call btn')
    activateButton();
  const clickedAddressCard = event.currentTarget;
  console.log("Clicked Address Card:", clickedAddressCard);
  let clickedId=clickedAddressCard.id;
 // clicked div
  clickedAddressCard.style.border = '1px solid #333'; // You can adjust the color and thickness
  clickedAddressCard.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)'; // Add a shadow

  //document.getElementById(clickedId)
  //not selected div
  const addressCards = document.querySelectorAll('.addresss');
  addressCards.forEach((addressCard) => {
    if (addressCard.id !== clickedId) {
      addressCard.style.border = 'initial'; // Set to the default background color or any color you prefer
      addressCard.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.2)';
    }
  });
}
function displayAddressCard(address){
  const addressContainer = document.querySelector(".shippingMethod1");
  
  const addressCard = document.createElement("div");
  divid=divid+1;
  addressCard.id=divid;
  addressCard.classList.add("addresss");
  
  const { First_Name, Last_Name, Address, Zipcode, City, State, Country, Phone} = address;
  
  const cardContent = `
  <p class="name-part">${First_Name} ${Last_Name}</p>
  <br>
  <p class="info-part">${Address}</p>
  <p class="info-part">${Zipcode}</p>
  <p class="info-part">${City} (${State})</p>
  <p class="info-part">${Country}</p>
  <p class="info-part">${Phone}</p>
  `;
  
  addressCard.innerHTML = cardContent;
  addressContainer.appendChild(addressCard);
  const currentaddressCard=document.getElementById(divid);
  currentaddressCard.onclick = function (event) {
    handleClick(event, divid);
  };
  
}


//empty data check(disable button)
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('div');
    //const submitButton = document.getElementById('shipAddress');
    displayAddress();
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
  
