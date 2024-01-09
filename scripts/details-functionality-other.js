import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, doc, getDocs, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {updateCountsAndVisibility} from "./logincontroller.js";

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

//Retreiving the url parameter values
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');
const apiUrl = urlParams.get('apiUrl');
const category = urlParams.get('category');

const storedProduct = JSON.parse(sessionStorage.getItem('product'));

addCartBtn.addEventListener('click', () => {
    let productInCart = Cart.find(product => product.product_id === productId);
    if (productInCart !== undefined)
        Cart = Cart.map(product => product.product_id === productInCart.product_id
            ? { ...product, count: ++product.count } : product);
    else
        Cart.push({ ...storedProduct, size: "null", count: 1 });



    updateDoc(userDocRef, { Cart })                       // {Cart: Cart} is same as {Cart}
        .then(() => {
            console.log("product added to cart");
            console.log(Cart);
            toastContent.innerText = `You added ${storedProduct.name} to your cart`;
            const myToast = new bootstrap.Toast(toastShow);
            myToast.show();
            updateCountsAndVisibility();
        })
        .catch(() => {
            console.log("product adding failed");
        })
});

const wishlistBtn = document.getElementById("add-wishlist-btn");
wishlistBtn.addEventListener('click', () => {
    let wishlistText = 'add';

    if (wishlistBtn.innerText.toLowerCase().includes("remove")) {
        wishlistText = 'remove';
        const index = Wishlist.findIndex(product => product.product_id === productId);
        index > -1 && Wishlist.splice(index, 1);
    } else {
        const productInWishlist = Wishlist.find(product => product.product_id === productId);
        if (productInWishlist === undefined)
            Wishlist.push({ ...storedProduct, size: "null", count: 1 });
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
        })
        .catch(() => { console.log(` error in ${wishlistText === 'add' ? 'adding to' : 'removing from'} wishlist`); });
});
