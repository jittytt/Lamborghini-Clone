import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

function updateSubtotalAndTotal() {
    const activeUserDocRef = doc(db, 'ActiveUser', 'Email_ID');

    getDoc(activeUserDocRef)
        .then((docm) => {
            if (docm.exists()) {
                const activeEmail = docm.data().Email;

                const userDataDocRef = doc(db, 'UsersData', activeEmail);
                getDoc(userDataDocRef)
                    .then((userDoc) => {
                        if (userDoc.exists()) {
                            const cartItems = userDoc.data().Cart;

                            // Calculate subtotal
                            const subtotal = cartItems.reduce((sum, item) => {
                                return sum + item.count * item.price;
                            }, 0);

                            // Update the subtotal value on the page with commas
                            const subtotalElement = document.querySelector('.subtotal-value');
                            if (subtotalElement) {
                                subtotalElement.textContent = formatAmount(subtotal);
                            }

                            // Calculate and update the total value (you might need to include shipping, tax, etc.)
                            const total = subtotal; // Placeholder for now, update as needed
                            const tax = subtotal * 0.03;
                            const shipping_tax = subtotal * 0.02;
                            // Update the total value on the page with commas
                            const totalElement = document.querySelector('.order-value');
                            const taxElement = document.querySelector('.tax-value');
                            const shippingElement = document.querySelector('.shipping-value');
                            if (totalElement) {
                                totalElement.textContent = formatAmount(total + tax + shipping_tax);
                                taxElement.textContent = formatAmount(tax);
                                shippingElement.textContent = formatAmount(shipping_tax);
                            }

                            // Add the logic for updating TotalCost here
                            const finalTotal = total + tax + shipping_tax;
                            updateTotalCost(userDataDocRef, finalTotal);
                        } else {
                            console.log('User document not found');
                        }
                    })
                    .catch((error) => {
                        console.error('Error getting user document:', error);
                    });
            } else {
                console.log('ActiveUser document not found');
            }
        })
        .catch((error) => {
            console.error('Error getting ActiveUser document:', error);
        });
}

// Helper function to format amount with commas
function formatAmount(amount) {
    return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Function to update TotalCost in the database
function updateTotalCost(userDataDocRef, finalTotal) {
    updateDoc(userDataDocRef, {
        TotalCost: finalTotal
    })
        .then(() => {
            console.log('TotalCost updated successfully.');
            // You can perform additional actions after updating TotalCost if needed
        })
        .catch((error) => {
            console.error('Error updating TotalCost:', error);
        });
}

const checkoutButton = document.querySelector('.checkout-button');

checkoutButton.addEventListener('click', updateSubtotalAndTotal);

// Call the function to update subtotal and total when the page loads
window.addEventListener('load', updateSubtotalAndTotal);
