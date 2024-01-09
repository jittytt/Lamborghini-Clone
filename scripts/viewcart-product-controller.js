import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, collection, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
export {incrementProductQuantity, decrementProductQuantity, removeProduct, addToWishlist, emptyCart};
import { updateCountsAndVisibility } from "./logincontroller.js";

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

            await updateDoc(userDataDocRef, { Cart: updatedCart });
            updateCountsAndVisibility();
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

            await updateDoc(userDataDocRef, { Cart: updatedCart });
            updateCountsAndVisibility();
        }
    } catch (error) {
        console.error("Error incrementing quantity:", error);
    }

    reloadPage();
}


async function removeProduct(productID, size) {
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

async function addToWishlist(productID, size) {
    try {
        const activeUserDocRef = doc(db, 'ActiveUser', 'Email_ID');
        const activeUserDoc = await getDoc(activeUserDocRef);
        const email = activeUserDoc.data().Email;

        const userDataDocRef = doc(db, 'UsersData', email);
        const userDataDoc = await getDoc(userDataDocRef);

        if (userDataDoc.exists()) {
            const cartItems = userDataDoc.data().Cart || [];

            // Find the item with the matching productID and size in Cart
            const itemToMove = cartItems.find(item => item.product_id === productID && item.size === size);

            if (itemToMove) {
                // Remove the item from Cart
                const updatedCart = cartItems.filter(item => item !== itemToMove);

                // Get the current Wishlist array
                const wishlistItems = userDataDoc.data().Wishlist || [];

                // Add the entire map to Wishlist
                wishlistItems.push(itemToMove);

                // Update the document with the modified Cart and Wishlist arrays
                await updateDoc(userDataDocRef, { Cart: updatedCart, Wishlist: wishlistItems });
                updateCountsAndVisibility();

                console.log("Product moved to Wishlist successfully.");
            } else {
                console.log("Product not found in Cart.");
            }
        } else {
            console.log('User document not found.');
        }
    } catch (error) {
        console.error("Error moving product to Wishlist:", error);
    }
    reloadPage();
}


async function emptyCart(activeEmail) {
    console.log("clearing cart");
    const email = activeEmail;
    console.log(email);
   
    // Reference to the Firestore collection
    const usersDataCollection = collection(db, "UsersData");
    const userDocRef = doc(usersDataCollection, email);
    console.log("Hi");
    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const cart = userDoc.data().Cart;
        await updateDoc(userDocRef, { Cart: [] });
        updateCountsAndVisibility();
        console.log("Cart successfully cleared.");
      } else {
        console.error("Document not found for user email: ", email);
      }
    } catch (error) {
      console.error("Error fetching or updating document: ", error);
    }
    reloadPage(); 
  }
