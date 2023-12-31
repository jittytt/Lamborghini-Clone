import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

function displayAddresses() {
    // Fetch the email from session storage
    // const userEmail = sessionStorage.getItem("Email");
    const userEmail = "varghesenigin2001@gmail.com";
    if (!userEmail) {
      console.error("Email not found in session storage");
      return;
    }
  
    // Reference to the Firestore collection
    const usersDataCollection = collection(db, "UsersData");
  
    // Query the document with the name as the user's email
    const userDocRef = doc(usersDataCollection, userEmail);
  
    getDoc(userDocRef)
      .then((doc) => {
        if (doc.exists()) {
          // Document found, fetch the addresses array
          const addresses = doc.data().Address;
  
          // Display each address
          addresses.forEach((address, index) => {
            displayAddressCard(address, index);
          });
        } else {
          console.error("Document not found for user email: ", userEmail);
        }
      })
      .catch((error) => {
        console.error("Error fetching document: ", error);
      });
  }
  
  // Function to create and append address card
  function displayAddressCard(address, index) {
    const addressContainer = document.querySelector(".address-container");
  
    // Create a div element for the address card
    const addressCard = document.createElement("div");
    addressCard.classList.add("address");
  
    // Extract details from the address map
    const { First_Name, Last_Name, Address, Zip, City, State, Country, Phone} = address;
  
    // Create HTML content for the address card
    const cardContent = `
  <p class="name-part">${First_Name} ${Last_Name}</p>
  <br>
  <p class="info-part">${Address}</p>
  <p class="info-part">${Zip}</p>
  <p class="info-part">${City} (${State})</p>
  <p class="info-part">${Country}</p>
  <p class="info-part">${Phone}</p>
`;

  
    // Set the HTML content of the address card
    addressCard.innerHTML = cardContent;
  
    // Append the address card to the address container
    addressContainer.appendChild(addressCard);
  }
  
  // Call the displayAddresses function when the page is loaded
  document.addEventListener("DOMContentLoaded", displayAddresses);
