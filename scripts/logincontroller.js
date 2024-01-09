import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, updateDoc, getDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
export {updateCountsAndVisibility};
import {firebaseConfig} from "./environment.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function () {
    updateCountsAndVisibility();
    const showPopUpButton = document.getElementById('showPopUp');
    const popUp = document.querySelector('.pop-up');
    const popUpNamePart = document.getElementById('pop-up-name-part');
    const popUpLogoutCapt = document.querySelector('.pop-up-logout-capt');
    const navbarLogout = document.getElementById('navbar-signout');
    showPopUpButton.addEventListener('click', function () {
        fetchDataFromFirebase()
            .then(userData => {
                if (userData && userData.First_Name) {
                    popUpNamePart.textContent = userData.First_Name;
                    popUp.style.display = 'block';
                } else {
                    window.location.href = './pages/login.html';
                }
            })
            .catch(error => {
                console.error('Error fetching data from Firebase:', error);
            });
    });

    document.addEventListener('click', function (event) {
        if (popUp && !popUp.contains(event.target) && event.target !== showPopUpButton) {
            popUp.style.display = 'none';
        }
    });

    popUpLogoutCapt.addEventListener('click', logout);
    // navbarLogout.addEventListener('click', logout);

    async function logout() {
        try {
            const activeUserDocRef = doc(db, 'ActiveUser', 'Email_ID');
            await updateDoc(activeUserDocRef, {
                Email: ''
            });
            popUp.style.display = 'none';
            window.location.href = "../index.html";
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
    
    async function fetchDataFromFirebase() {
        try {
            const emailIdDocumentRef = doc(db, 'ActiveUser', 'Email_ID');
            const emailDataDoc = await getDoc(emailIdDocumentRef);

            if (emailDataDoc.exists()) {
                const userEmail = emailDataDoc.data().Email;
                if (userEmail) {
                    const userDataDocRef = doc(db, 'UsersData', userEmail);
                    const userDataDoc = await getDoc(userDataDocRef);

                    if (userDataDoc.exists()) {
                        const userData = userDataDoc.data();
                        return userData;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
});

async function updateCountsAndVisibility() {

    const cartCountDiv = document.querySelector('.cart-count-div');
    const wishlistCountDiv = document.querySelector('.wishlist-count-div');

    const activeUserDocRef = doc(collection(db, 'ActiveUser'), 'Email_ID');
    const activeUserSnapshot = await getDoc(activeUserDocRef);
    
    if (activeUserSnapshot.exists()) {
        const email = activeUserSnapshot.data().Email;

        const userDataDocRef = doc(collection(db, 'UsersData'), email);
        const userSnapshot = await getDoc(userDataDocRef);

        if (userSnapshot.exists()) {
            const cartArray = userSnapshot.data().Cart || [];
            const wishlistArray = userSnapshot.data().Wishlist || [];

            console.log(cartArray.length);
            cartCountDiv.style.display = 'block';
            cartCountDiv.querySelector('.cart-count-value').textContent = cartArray.length;

            console.log(wishlistArray.length);
            wishlistCountDiv.style.display = 'block';
            wishlistCountDiv.querySelector('.wishlist-count-value').textContent = wishlistArray.length;

        }
    }
}

