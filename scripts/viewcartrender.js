import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {incrementProductQuantity, decrementProductQuantity, removeProduct, addToWishlist, emptyCart} from './viewcart-product-controller.js';
import {firebaseConfig} from "./environment.js";
let address;
let totalAmount;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function renderCartItems() {
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
                const cartItems = userDoc.data().Cart;
                address = userDoc.data().Address; //to determine proceed to checkout page.
                const totalAmountt = userDoc.data().TotalCost;
                totalAmount=totalAmountt;
               console.log(totalAmount);
              

                cartItems.forEach((item) => {
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
                    <p class="cart-product-size" id="size-removal"> Size : <span class="size-value">${item.size}</span></p>
                </div>
                <div class="cart-product-quantity">
                <svg class="minus-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" onclick="decrementProductQuantity('${item.product_id}', '${item.size}')"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></svg>
                <span class="cart-product-quantity-number">${item.count}</span>
                <svg class="plus-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" onclick="incrementProductQuantity('${item.product_id}', '${item.size}')"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>                            
                </div>
                <div class="wishlist-delete-icons-container">
                    <span class="MuiIconButton-label">
                    <svg width="27" height="25" fill="gray" xmlns="http://www.w3.org/2000/svg" class="favourites-icon" focusable="false" viewBox="0 0 27 25" aria-hidden="true" onclick="addToWishlist('${item.product_id}', '${item.size}')">
                    <path d="M26.77 9.59l-9.17-1.3L13.5.18 9.4 8.29.23 9.59l6.63 6.32-1.56 8.91 8.2-4.21 8.2 4.21-1.56-8.91 6.63-6.32zM20.37 23L14 19.72l-.46-.23-.46.23L6.63 23l1.22-6.94.09-.53-.39-.37-5.14-4.87 7.13-1 .52-.07.23-.47 3.21-6.36 3.21 6.35.23.47.52.07 7.13 1-5.14 4.89-.39.37.09.53L20.37 23z"></path>
                        </svg>
                    </span>
                    <span class="MuiIconButton-label-del">
                    <svg width="21" height="27" fill="none" xmlns="http://www.w3.org/2000/svg" class="trash-icon" focusable="false" viewBox="0 0 21 27" aria-hidden="true"  onclick="removeProduct('${item.product_id}', '${item.size}')"><path d="M20.07 4.44h-4.75A4.91 4.91 0 0010.5.91a4.91 4.91 0 00-4.82 3.53H.93v3.65h1.5v18.84h16.14V8.09h1.5V4.44zM10.5 1.8a4.05 4.05 0 013.9 2.64H6.6a4.05 4.05 0 013.9-2.64zm7.08 24.14H3.42V8.09h14.16v17.85zm1.49-18.85H1.93V5.44h17.14v1.65z" fill="#010202"></path>
                        </svg>
                    </span>
                </div>
            </div>
            <hr class="cart-divider">
            <div class="price-section">
                <span class="price-part">Price &nbsp;&#36;<span class="price-value">${item.price}</span></span>
                <span class="subtotal-part">Subtotal &nbsp;&#36;<span class="subtotal-part">${item.count * item.price}</span></span>
            </div>
            <hr class="cart-divider">
        </div>
    `;
                  console.log(item);
                  
                  cartItemList.appendChild(cartItemDiv);
                  if(item.size === "null") {
                    const sizeToBeRemoved = document.getElementById('size-removal');
                    if(sizeToBeRemoved) 
                      sizeToBeRemoved.remove();
                  }
                });
  
                const emptyCartDiv = document.createElement('div');
                emptyCartDiv.classList.add('empty-cart-div');
                emptyCartDiv.innerHTML = `
                <button CLASS='empty-cart-button' onclick="emptyCart('${activeEmail}')">EMPTY CART</button>
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
      


window.addEventListener('load', renderCartItems);

window.decrementProductQuantity=decrementProductQuantity;
window.incrementProductQuantity=incrementProductQuantity;
window.removeProduct = removeProduct;

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
window.addToWishlist = addToWishlist;
window.emptyCart = emptyCart;