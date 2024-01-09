import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {incrementProductQuantityPopupNav, decrementProductQuantityPopupNav, removeProductPopupNav} from './popup-cart-product-controller.js'
// export {popup_cartrender};
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

  let address;
  let totalAmount;
  function popup_cartrender() {
        const cartProductList = document.querySelector('.cart-product-list-popup');
        const grandTotalValue = document.querySelector('.grand-total-value');
        var totalPrice = 0;
        
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
                            address = userDoc.data().Address; //to determine proceed to checkout page.
                            const totalAmountt = userDoc.data().TotalCost;
                            totalAmount=totalAmountt;
                            console.log(totalAmount);
  
                            cartItems.forEach((item) => {
                                console.log("HIIII" + item.image_url);
                                const cartItemDiv = document.createElement('div');
                                cartItemDiv.classList.add('cart-item-popup');
                                cartItemDiv.innerHTML = `
                                    <div class="cart-product-icon-popup">
                                        <img src="${item.default_image_url}" alt="Product Image">
                                    </div>
                                    <div class="cart-item-popup-info-popup">
                                        <div class="cart-product-code">
                                            <span class="cart-product-code-value">${item.product_id}</span>
                                        </div>
                                        <div class="cart-product-name">
                                            <span class="cart-product-name-value">${item.name}</span>
                                        </div>
                                        <div class="cart-product-size">
                                            Size : <span class="cart-product-name-value">${item.size}</span>
                                        </div>
                                        <div class="cart-product-price-popup">
                                            &#36; <span class="cart-product-price-popup-value">${item.price.toFixed(2)}</span>
                                        </div>
                                        <div class="cart-product-quantity-popup">
                                            <svg class="pop-up-minus-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" onclick="decrementProductQuantityPopupNav('${item.product_id}', '${item.size}')"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></svg>
                                            <span class="cart-product-quantity-popup-number">${item.count}</span>
                                            <svg class="pop-up-plus-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" onclick="incrementProductQuantityPopupNav('${item.product_id}', '${item.size}')"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>                            
                                            <div class="wishlist-delete-icons-container-popup">
                                                <span class="MuiIconButton-label-del">
                                                <svg width="21" height="18" fill="none" xmlns="http://www.w3.org/2000/svg" class="trash-icon" focusable="false" viewBox="0 0 21 27" aria-hidden="true"  onclick="removeProductPopupNav('${item.product_id}', '${item.size}')"><path d="M20.07 4.44h-4.75A4.91 4.91 0 0010.5.91a4.91 4.91 0 00-4.82 3.53H.93v3.65h1.5v18.84h16.14V8.09h1.5V4.44zM10.5 1.8a4.05 4.05 0 013.9 2.64H6.6a4.05 4.05 0 013.9-2.64zm7.08 24.14H3.42V8.09h14.16v17.85zm1.49-18.85H1.93V5.44h17.14v1.65z" fill="#010202"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                `;
                                totalPrice += item.price * item.count;
                                cartProductList.appendChild(cartItemDiv);
                              });
  
                            const divider = document.querySelector('.popup-store-divider');
                            divider.innerHTML = `
                            <hr class = "pop-up-divider" style = "margin-right : 10px;">
                            `;
                              
                            
                            const tax = totalPrice * 0.03;
                            const shipping_tax = totalPrice * 0.02;
                            const totalCost = (totalPrice + tax + shipping_tax).toFixed(2);

                            const grandTotalDiv = document.querySelector('.grand-total-div');
                            grandTotalDiv.innerHTML = `
                                <p>Grand Total &#36; <span class="grand-total-value">${totalCost}</span></p>
                            `;
                        
                            const proceedToCheckoutDiv = document.querySelector('.procced-to-checkout-button-div');
                            proceedToCheckoutDiv.innerHTML = `
                                <button class="procced-to-checkout-button" onclick='checkoutPage()'><span>PROCEED TO CHECKOUT</span></button>
                            `;
                        
                            // Update the existing view-cart-div-popup
                            const viewCartDiv = document.querySelector('.view-cart-div-popup');
                            viewCartDiv.innerHTML = `
                            <!-- Add this onclick attribute to your button -->
                            <button CLASS='view-cart-button-popup' onclick="openViewCartPage()">VIEW CART</button>
                            `;
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

  document.addEventListener('DOMContentLoaded', () => {
    popup_cartrender();
});


function openViewCartPage() {
    window.location.href = '../pages/viewcart.html';
}

window.openViewCartPage = openViewCartPage;
window.decrementProductQuantityPopupNav = decrementProductQuantityPopupNav;
window.incrementProductQuantityPopupNav = incrementProductQuantityPopupNav;
window.removeProductPopupNav = removeProductPopupNav;

//determine page to load
window.checkoutPage = () => {
  let amount=Math.floor(totalAmount) +28;//includes shipping
  const addresslength=address.length;
  console.log(amount);
  if (addresslength==0){
    console.log("no address");
    window.location.href='../pages/checkout_shipping.html'
  }
  else{
    console.log("has address");
    window.location.href=`../pages/checkout_shipping_method.html?amount=${amount}`
  }
};