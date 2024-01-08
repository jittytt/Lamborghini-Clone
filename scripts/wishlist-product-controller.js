import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, collection, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
export {incrementProductQuantityWishlist, addToCart, decrementProductQuantityWishlist, removeProductWishlist, addAllToCart, emptyCart};

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

async function incrementProductQuantityWishlist(productID, size) {

    try {
        console.log("Hi");
        const activeUserDocRef = doc(db, 'ActiveUser', 'Email_ID');
        const activeUserDoc = await getDoc(activeUserDocRef);
        const email = activeUserDoc.data().Email;
        console.log("Hi");
        const userDataDocRef = doc(db, 'UsersData', email);
        const userDataDoc = await getDoc(userDataDocRef);
        console.log("Hi");
        if (userDataDoc.exists()) {
            const WishlistItems = userDataDoc.data().Wishlist;
            const updatedCart = WishlistItems.map(item => {
                if (item.product_id === productID && item.size === size) {
                    return { ...item, count: item.count + 1 };
                }
                return item;
            });

            await updateDoc(userDataDocRef, { Wishlist: updatedCart });
        }
    } catch (error) {
        console.error("Error incrementing quantity:", error);
    }

    reloadPage();
}

async function decrementProductQuantityWishlist(productID, size) {
    
    try {
        const activeUserDocRef = doc(db, 'ActiveUser', 'Email_ID');
        const activeUserDoc = await getDoc(activeUserDocRef);
        const email = activeUserDoc.data().Email;

        const userDataDocRef = doc(db, 'UsersData', email);
        const userDataDoc = await getDoc(userDataDocRef);

        if (userDataDoc.exists()) {
            const WishlistItems = userDataDoc.data().Wishlist;
            const updatedCart = WishlistItems.map(item => {
                if (item.product_id === productID && item.size === size) {
                    const newCount = Math.max(1, item.count);
                    if(item.count > 1)
                        return { ...item, count: item.count - 1 };
                    else
                    return { ...item, count: 1 };
                }
                return item;
            });

            await updateDoc(userDataDocRef, { Wishlist: updatedCart });
        }
    } catch (error) {
        console.error("Error incrementing quantity:", error);
    }

    reloadPage();
}

async function removeProductWishlist(productID, size) {
    try {
        const activeUserDocRef = doc(db, 'ActiveUser', 'Email_ID');
        const activeUserDoc = await getDoc(activeUserDocRef);
        const email = activeUserDoc.data().Email;

        const userDataDocRef = doc(db, 'UsersData', email);
        const userDataDoc = await getDoc(userDataDocRef);

        if (userDataDoc.exists()) {
            const WishlistItems = userDataDoc.data().Wishlist;

            const updatedCart = WishlistItems.filter(item => !(item.product_id === productID && item.size === size));

            await updateDoc(userDataDocRef, { Wishlist: updatedCart });

            console.log("Product removed successfully.");
        } else {
            console.log('User document not found.');
        }
    } catch (error) {
        console.error("Error removing product:", error);
    }
    reloadPage();
}

async function addToCart(productID, size) {
    try {
        const activeUserDocRef = doc(db, 'ActiveUser', 'Email_ID');
        const activeUserDoc = await getDoc(activeUserDocRef);
        const email = activeUserDoc.data().Email;

        const userDataDocRef = doc(db, 'UsersData', email);
        const userDataDoc = await getDoc(userDataDocRef);

        if (userDataDoc.exists()) {
            const wishlistItems = userDataDoc.data().Wishlist || [];

            // Find the item with the matching productID and size in Wishlist
            const itemToMove = wishlistItems.find(item => item.product_id === productID && item.size === size);

            if (itemToMove) {
                // Remove the item from Wishlist
                const updatedWishlist = wishlistItems.filter(item => item !== itemToMove);

                // Get the current Cart array
                const cartItems = userDataDoc.data().Cart || [];

                // Add the entire map to Cart
                cartItems.push(itemToMove);

                // Update the document with the modified Wishlist and Cart arrays
                await updateDoc(userDataDocRef, { Wishlist: updatedWishlist, Cart: cartItems });

                console.log("Product moved to Cart successfully.");
            } else {
                console.log("Product not found in Wishlist.");
            }
        } else {
            console.log('User document not found.');
        }
    } catch (error) {
        console.error("Error moving product to Cart:", error);
    }
    reloadPage();
}


async function emptyCart(activeEmail) {
    console.log("clearing Wishlist");
    const email = activeEmail;
    console.log(email);
   
    // Reference to the Firestore collection
    const usersDataCollection = collection(db, "UsersData");
    const userDocRef = doc(usersDataCollection, email);
    console.log("Hi");
    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        console.log("Hi");
        // Document found, fetch the Wishlist array
        const Wishlist = userDoc.data().Wishlist;
        console.log("Hi");
        // Clear the Wishlist by updating the document
        await updateDoc(userDocRef, { Wishlist: [] });
        console.log("Hi");
        console.log("Wishlist successfully cleared.");
      } else {
        console.error("Document not found for user email: ", email);
      }
    } catch (error) {
      console.error("Error fetching or updating document: ", error);
    }
    reloadPage(); 
  }

  async function addAllToCart(activeEmail) {
    try {
        // Get a reference to the UsersData collection
        const userDataCollectionRef = collection(db, 'UsersData');

        // Get a reference to the document with the given activeEmail
        const userDataDocRef = doc(userDataCollectionRef, activeEmail);

        // Get the document snapshot
        const userDataDoc = await getDoc(userDataDocRef);

        if (userDataDoc.exists()) {
            // Retrieve the Wishlist and Cart arrays from the document
            const wishlistItems = userDataDoc.data().Wishlist || [];
            const cartItems = userDataDoc.data().Cart || [];

            if (wishlistItems.length > 0) {
                // Move all elements from Wishlist to Cart
                const updatedCart = [...cartItems, ...wishlistItems];

                // Update the document with the modified Cart array
                await updateDoc(userDataDocRef, { Cart: updatedCart, Wishlist: [] });

                console.log("All items moved from Wishlist to Cart successfully.");
            } else {
                console.log("Wishlist is empty. Nothing to move to Cart.");
            }
        } else {
            console.log('User document not found.');
        }
    } catch (error) {
        console.error("Error moving items from Wishlist to Cart:", error);
    }
    reloadPage();
}

