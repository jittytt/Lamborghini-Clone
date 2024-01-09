import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, doc, getDocs, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {updateCountsAndVisibility} from "./logincontroller.js";
import {firebaseConfig} from "./environment.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Retreiving email of the user currently logged in
const activeUserCollection = collection(db, "ActiveUser");
const activeUserSnapshot = await getDocs(activeUserCollection);
const email = activeUserSnapshot.docs[0].data().Email;

//Retreiving the details of the active user
const usersDataCollection = collection(db, "UsersData");
const userDocRef = doc(usersDataCollection, email);
const userDocSnap = await getDoc(userDocRef);
let Cart = userDocSnap.data().Cart || [];
let Wishlist = userDocSnap.data().Wishlist || [];

//Retreiving the button by its id to perform the add to Cart functionality
const addCartBtn = document.getElementById("select-option-btn");
const toastContent = document.getElementById('toast-content');
const toastShow = document.getElementById('toast-show');
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');
console.log(productId);
const apiUrl = urlParams.get('apiUrl');
const storedProduct = JSON.parse(sessionStorage.getItem('product'));

addCartBtn.addEventListener('click', () => {
    const sizeKeyRetreived = JSON.parse(sessionStorage.getItem('size'));
    const size = sizeKeyRetreived[productId].size;
    let productInCart = Cart.find(product => product.product_id === productId && product.size === size);
    if (productInCart !== undefined)
        Cart = Cart.map(product => product.product_id === productInCart.product_id && product.size === size
            ? { ...product, count: ++product.count } : product);
    else
        Cart.push({ ...storedProduct, size, count: 1 });

    // if there is an object with the particular productId and size 
    // if yes updating the count value 
    // if no set the object -->size: sessionStorage.getItem('size') replaced by size


    updateDoc(userDocRef, { Cart })                       // {Cart: Cart} is same as {Cart}
        .then(() => {
            console.log("product added to cart");
            console.log(Cart);
            toastContent.innerText = `You added ${storedProduct.name} to your cart`;
            const myToast = new bootstrap.Toast(toastShow);
            myToast.show();
            updateCountsAndVisibility();
            setTimeout(() => {
                location.reload();
            }, 3000);
        })
        .catch(() => {
            console.log("product adding failed");
        })
});

const wishlistBtn = document.getElementById("add-wishlist-btn");
wishlistBtn.addEventListener('click', () => {
    const size = sessionStorage.getItem('size');
    let wishlistText = 'add';
    if (wishlistBtn.innerText.toLowerCase().includes("remove")) {
        wishlistText = 'remove';
        const index = Wishlist.findIndex(product => product.product_id === productId && product.size === size);
        index > -1 && Wishlist.splice(index, 1);
    } else {
        const productInWishlist = Wishlist.find(product => product.product_id === productId && product.size === size);
        if (productInWishlist === undefined)
            Wishlist.push({ ...storedProduct, size, count: 1 });
    }

    console.log(Wishlist);

    updateDoc(userDocRef, { Wishlist })
        .then(() => {
            console.log(`product ${wishlistText}ed ${wishlistText === 'add' ? 'to' : 'from'} wishlist`);
            wishlistBtn.innerText = wishlistText === 'add'
                ? "REMOVE FROM WISHLIST"
                : "ADD TO WISHLIST";
                toastContent.innerText = `You added ${storedProduct.name} to your wishlist`;
                const myToast = new bootstrap.Toast(toastShow);
                myToast.show();
            sessionStorage.setItem('Wishlist', JSON.stringify(Wishlist));
            setTimeout(() => {
                location.reload();
            }, 3000);
        })
        .catch(() => { console.log(` error in ${wishlistText === 'add' ? 'adding to' : 'removing from'} wishlist`); });
});
