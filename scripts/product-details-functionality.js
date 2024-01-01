import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, doc, getDocs, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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

//Retreiving the button by its id to perform the add to Cart functionality
const addCartBtn = document.getElementById("select-option-btn");
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');
const apiUrl = urlParams.get('apiUrl');
const storedProduct = JSON.parse(sessionStorage.getItem('product'));

addCartBtn.addEventListener('click', () => {
    const size = sessionStorage.getItem('size');
    let productInCart = Cart.find(product => product.product_id === productId && product.size === size);
    if (productInCart !== undefined)
        Cart = Cart.map(product => product.product_id === productInCart.product_id && product.size === size ? { ...product, count: ++product.count } : product);
    else
        Cart.push({ ...storedProduct, size, count: 1 });
    console.log(Cart);
    // if there is an object with the particular productId and size 
    // if yes updating the count value 
    // if no set the object -->size: sessionStorage.getItem('size') replaced by size


    updateDoc(userDocRef, { Cart })                       // {Cart: Cart} is same as {Cart}
        .then(() => {
            console.log("product added to cart");
        })
        .catch(() => {
            console.log("product adding failed");
        })
});
