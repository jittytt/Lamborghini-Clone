import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
    const showPopUpButton = document.getElementById('showPopUp');
    const popUp = document.querySelector('.pop-up');
    const popUpNamePart = document.getElementById('pop-up-name-part');
    const popUpLogoutCapt = document.querySelector('.pop-up-logout-capt');

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

    async function logout() {
        try {
            const activeUserDocRef = doc(db, 'ActiveUser', 'Email_ID');
            await updateDoc(activeUserDocRef, {
                Email: ''
            });
            popUp.style.display = 'none';
            window.location.reload();
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
