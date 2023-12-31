import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {firebaseConfig} from "./environment.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function displayAddresses() {
  
  const activeUserCollectionRef = collection(db, 'ActiveUser');
  const emailIdDocumentRef = doc(activeUserCollectionRef, 'Email_ID');

  getDoc(emailIdDocumentRef)
    .then((docm) => {
      if (docm.exists()) {
        const userEmail = docm.data().Email;

        if (userEmail) {
          
          const usersDataCollection = collection(db, 'UsersData');
          const userDocRef = doc(usersDataCollection, userEmail);

          getDoc(userDocRef)
            .then((docm) => {
              if (docm.exists()) {
                const addresses = docm.data().Address;

                addresses.forEach((address) => {
                  displayAddressCard(address);
                });
              } else {
                console.error("Document not found for user email:", userEmail);
              }
            })
            .catch((error) => {
              console.error("Error fetching user document:", error);
            });
        } else {
          console.error("Email not found in the ActiveUser document");
        }
      } else {
        console.error("Document does not exist in the ActiveUser collection");
      }
    })
    .catch((error) => {
      console.error("Error fetching ActiveUser document:", error);
    });
}
  
  function displayAddressCard(address) {
    const addressContainer = document.querySelector(".address-container");
  
    const addressCard = document.createElement("div");
    addressCard.classList.add("address");
  
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
  }
  
  document.addEventListener("DOMContentLoaded", displayAddresses);
