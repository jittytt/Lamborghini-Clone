import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
export {updateCountsAndVisibility};

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
                    console.log("hi");
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
    navbarLogout.addEventListener('click', logout);

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
    // Get references to the cart-count-div and wishlist-count-div
    console.log("Hello");
    const cartCountDiv = document.querySelector('.cart-count-div');
    const wishlistCountDiv = document.querySelector('.wishlist-count-div');

    // Get the active user's email
    const activeUserDocRef = doc(collection(db, 'ActiveUser'), 'Email_ID');
    const activeUserSnapshot = await getDoc(activeUserDocRef);
    
    if (activeUserSnapshot.exists()) {
        const email = activeUserSnapshot.data().Email;

        // Get the reference to the user's data
        const userDataDocRef = doc(collection(db, 'UsersData'), email);
        const userSnapshot = await getDoc(userDataDocRef);

        if (userSnapshot.exists()) {
            const cartArray = userSnapshot.data().Cart || [];
            const wishlistArray = userSnapshot.data().Wishlist || [];

            console.log("Hi2");
            // Update visibility of cart-count-div
            console.log(cartArray.length);
            if (cartArray.length > 0) {
                cartCountDiv.style.display = 'block';
                cartCountDiv.querySelector('.cart-count-value').textContent = cartArray.length;
            } else {
                cartCountDiv.style.display = 'none';
            }
            console.log("Hi3");
            // Update visibility of wishlist-count-div
            console.log(wishlistArray.length);
            if (wishlistArray.length > 0) {
                wishlistCountDiv.style.display = 'block';
                wishlistCountDiv.querySelector('.wishlist-count-value').textContent = wishlistArray.length;
            } else {
                wishlistCountDiv.style.display = 'none';
            }
            console.log("Hi4");
        }
    }
}
