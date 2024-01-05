import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
export {incrementProductQuantity, decrementProductQuantity};

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

function reloadPage() {
    location.reload();
}

async function incrementProductQuantity(productID, size) {

    try {
        const activeUserDocRef = doc(db, 'ActiveUser', 'Email_ID');
        const activeUserDoc = await getDoc(activeUserDocRef);
        const email = activeUserDoc.data().Email;

        const userDataDocRef = doc(db, 'UsersData', email);
        const userDataDoc = await getDoc(userDataDocRef);

        if (userDataDoc.exists()) {
            const cartItems = userDataDoc.data().Cart;
            const updatedCart = cartItems.map(item => {
                if (item.product_id === productID && item.size === size) {
                    return { ...item, count: item.count + 1 };
                }
                return item;
            });

            await setDoc(userDataDocRef, { Cart: updatedCart });
        }
    } catch (error) {
        console.error("Error incrementing quantity:", error);
    }

    reloadPage();
}

async function decrementProductQuantity(productID, size) {
    
    try {
        const activeUserDocRef = doc(db, 'ActiveUser', 'Email_ID');
        const activeUserDoc = await getDoc(activeUserDocRef);
        const email = activeUserDoc.data().Email;

        const userDataDocRef = doc(db, 'UsersData', email);
        const userDataDoc = await getDoc(userDataDocRef);

        if (userDataDoc.exists()) {
            const cartItems = userDataDoc.data().Cart;
            const updatedCart = cartItems.map(item => {
                if (item.product_id === productID && item.size === size) {
                    const newCount = Math.max(1, item.count);
                    if(item.count > 1)
                        return { ...item, count: item.count - 1 };
                    else
                    return { ...item, count: 1 };
                }
                return item;
            });

            await setDoc(userDataDocRef, { Cart: updatedCart });
        }
    } catch (error) {
        console.error("Error incrementing quantity:", error);
    }

    reloadPage();
}