import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, collection, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
export {incrementProductQuantityPopupNav, decrementProductQuantityPopupNav, removeProductPopupNav};
import { updateCountsAndVisibility } from "./logincontroller.js";
import {firebaseConfig} from "./environment.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function reloadPage() {
    location.reload();
    // popup_cartrender();
}

async function incrementProductQuantityPopupNav(productID, size) {

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

            await updateDoc(userDataDocRef, { Cart: updatedCart });
            updateCountsAndVisibility();
        }
    } catch (error) {
        console.error("Error incrementing quantity:", error);
    }

    reloadPage();
}

async function decrementProductQuantityPopupNav(productID, size) {
    
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

            await updateDoc(userDataDocRef, { Cart: updatedCart });
            updateCountsAndVisibility();
        }
    } catch (error) {
        console.error("Error incrementing quantity:", error);
    }

    reloadPage();
}

async function removeProductPopupNav(productID, size) {
    try {
        const activeUserDocRef = doc(db, 'ActiveUser', 'Email_ID');
        const activeUserDoc = await getDoc(activeUserDocRef);
        const email = activeUserDoc.data().Email;

        const userDataDocRef = doc(db, 'UsersData', email);
        const userDataDoc = await getDoc(userDataDocRef);

        if (userDataDoc.exists()) {
            const cartItems = userDataDoc.data().Cart;

            const updatedCart = cartItems.filter(item => !(item.product_id === productID && item.size === size));

            await updateDoc(userDataDocRef, { Cart: updatedCart });
            updateCountsAndVisibility();

            console.log("Product removed successfully.");
        } else {
            console.log('User document not found.');
        }
    } catch (error) {
        console.error("Error removing product:", error);
    }
    reloadPage();
}
