import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {incrementProductQuantityWishlist, decrementProductQuantityWishlist, removeProductWishlist, addToCart, addAllToCart, emptyCart} from './wishlist-product-controller.js';

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

function renderwishlistItems() {
    const cartItemList = document.querySelector('.cart-item-list');
  
    const activeUserDocRef = doc(db, 'ActiveUser', 'Email_ID');
    getDoc(activeUserDocRef)
      .then((docm) => {
        if (docm.exists()) {
          const activeEmail = docm.data().Email;
  
          console.log(activeEmail);

          const userDataDocRef = doc(db, 'UsersData', activeEmail);
          getDoc(userDataDocRef)
            .then((userDoc) => {
              if (userDoc.exists()) {
                const wishlistItems = userDoc.data().Wishlist;

                wishlistItems.forEach((item) => {
                  const cartItemDiv = document.createElement('div');
                  cartItemDiv.classList.add('cart-item-div');
                  cartItemDiv.innerHTML = `
        <div class="cart-item-div">
            <div class="cart-item">
                <div class="product-image">
                    <img src="${item.default_image_url}" alt="Product Image">
                </div>
                <div class="product-info">
                    <h5 class="cart-product-name">${item.name}</h5>
                    <p class="cart-product-id">${item.product_id}</p>
                    </div>
                <div class = "product-price">
                  <span class="price-part">&#36;<span class="price-value">${formatAmount(item.price)}</span></span>
                </div>
                <div class="cart-product-quantity">
                <svg class="minus-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" onclick="decrementProductQuantityWishlist('${item.product_id}', '${item.size}')"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></svg>
                <span class="cart-product-quantity-number">${item.count}</span>
                <svg class="plus-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" onclick="incrementProductQuantityWishlist('${item.product_id}', '${item.size}')"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>                            
                </div>
                <div class = "subtotal-section">
                <span class="subtotal-part">&#36;<span class="subtotal-part">${formatAmount(item.count * item.price)}</span></span>
                </div>
                <div class="wishlist-delete-icons-container">
                <span class="MuiIconButton-label"><svg width="19" height="21" fill="gray" xmlns="http://www.w3.org/2000/svg" class="MuiSvgIcon-root" focusable="false" viewBox="0 0 19 26" aria-hidden="true"  onclick="addToCart('${item.product_id}', '${item.size}')"><path clip-rule="evenodd" d="M13.8 5.82v-1a4.3 4.3 0 10-8.6 0v1H.9v20.06h17.2V5.82h-4.3zm-7.64-1a3.34 3.34 0 116.68 0v1H6.16v-1zm11 20.06H1.86V6.78H5.2v3.82h1V6.78h6.68v3.82h1V6.78h3.34l-.06 18.1z"></path></svg></span>
                    <span class="MuiIconButton-label-del">
                    <svg width="21" height="27" fill="none" xmlns="http://www.w3.org/2000/svg" class="trash-icon" focusable="false" viewBox="0 0 21 27" aria-hidden="true"  onclick="removeProductWishlist('${item.product_id}', '${item.size}')"><path d="M20.07 4.44h-4.75A4.91 4.91 0 0010.5.91a4.91 4.91 0 00-4.82 3.53H.93v3.65h1.5v18.84h16.14V8.09h1.5V4.44zM10.5 1.8a4.05 4.05 0 013.9 2.64H6.6a4.05 4.05 0 013.9-2.64zm7.08 24.14H3.42V8.09h14.16v17.85zm1.49-18.85H1.93V5.44h17.14v1.65z" fill="#010202"></path>
                        </svg>
                    </span>
                </div>
            </div>
            <hr class="cart-divider">
        </div>
    `;
                  cartItemList.appendChild(cartItemDiv);
                });
  
                const emptyCartDiv = document.createElement('div');
                emptyCartDiv.classList.add('empty-cart-div');
                emptyCartDiv.innerHTML = `
                <div class = "viewcart-buttons-div">
                <button CLASS='empty-wishlist-button' onclick="emptyCart('${activeEmail}')"><span>EMPTY WISHLIST</span></button>
                <button CLASS='add-all-to-cart-button' onclick="addAllToCart('${activeEmail}')"><span>ADD ALL TO CART</span></button>
                </div>
                `;
                cartItemList.appendChild(emptyCartDiv);
  
                const hrElement = document.createElement('hr');
                hrElement.classList.add('cart-divider');
                cartItemList.appendChild(hrElement);
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

window.addEventListener('load', renderwishlistItems);

window.decrementProductQuantityWishlist=decrementProductQuantityWishlist;
window.incrementProductQuantityWishlist=incrementProductQuantityWishlist;
window.removeProductWishlist = removeProductWishlist;
window.addToCart = addToCart;
window.addAllToCart = addAllToCart;
window.emptyCart = emptyCart;