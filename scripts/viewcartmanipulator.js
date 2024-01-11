import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {firebaseConfig} from "./environment.js";

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

                            const subtotal = cartItems.reduce((sum, item) => {
                                return sum + item.count * item.price;
                            }, 0);

                            const subtotalElement = document.querySelector('.subtotal-value');
                            if (subtotalElement) {
                                subtotalElement.textContent = formatAmount(subtotal);
                            }

                            const total = subtotal;
                            const tax = subtotal * 0.03;
                            const shipping_tax = subtotal * 0.02;
                            const totalElement = document.querySelector('.order-value');
                            const taxElement = document.querySelector('.tax-value');
                            const shippingElement = document.querySelector('.shipping-value');
                            if (totalElement) {
                                totalElement.textContent = formatAmount(total + tax + shipping_tax);
                                taxElement.textContent = formatAmount(tax);
                                shippingElement.textContent = formatAmount(shipping_tax);
                            }

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

function formatAmount(amount) {
    return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function updateTotalCost(userDataDocRef, finalTotal) {
    updateDoc(userDataDocRef, {
        TotalCost: finalTotal
    })
        .then(() => {
            console.log('TotalCost updated successfully.');
        })
        .catch((error) => {
            console.error('Error updating TotalCost:', error);
        });
}

const checkoutButton = document.querySelector('.checkout-button');

checkoutButton.addEventListener('click', updateSubtotalAndTotal);

window.addEventListener('load', updateSubtotalAndTotal);
