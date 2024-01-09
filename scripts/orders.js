import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, doc, getDocs, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { updateCountsAndVisibility } from "./logincontroller.js";
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
let orders = userDocSnap.data().Orders || {};

const ordersAccordionContainer = document.getElementById("orders-accordion");


console.log(Object.entries(orders));
for (const [key, value] of Object.entries(orders)) {
    const orderAccordion = document.createElement('div');
    //taking the date as string and splitting it to get the date, month and year
    const orderDateArray = value["order_date"].split('/');
    
    //seeting the shipping date date as 2 days after ordering
    const shippedDate = parseInt(orderDateArray[0])+1;
    
    //checks whether the current date is greater than shipped date and updates shipment status
    let shipmentStatus = "";
    const currentDate = new Date();
    if(currentDate.getDate() >= shippedDate) 
        shipmentStatus = "Order Shipped";
    else
        shipmentStatus = "Ordered Successfully";

    orderAccordion.innerHTML = `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading-${key}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${key}" aria-expanded="false" aria-controls="collapse-${key}">
                        <div class="accordion-title w-100 d-flex justify-content-around">
                            <h6>Order Number : ${value["order_id"]}</h6>
                            <h6>Order Date : ${value["order_date"]}</h6>
                            <h6>Shipment Status : ${shipmentStatus}</h6>
                            <h6>Total Price: $ ${value["total_cost"].toFixed(2)}</h6>      
                        </div>
                    </button>
                </h2>
                <div id="collapse-${key}" class="accordion-collapse collapse" aria-labelledby="collapse-${key}" data-bs-parent="#orders-accordion">
                    <div class="accordion-body" id="accordion-body-${key}">
                    </div>
                </div>
            </div>`;
    ordersAccordionContainer.appendChild(orderAccordion);
    const accordionBody = document.getElementById(`accordion-body-${key}`);
    for (const product of value["product_array"]) {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <div class="product-item d-flex align-items-center justify-content-between">
                <div class="image-container">
                    <img src="${product.default_image_url}" alt="Product Image">
                </div>
                <div class="product-info">
                    <h5 class="order-product-name">${product.name}</h5>
                    <p class="order-product-id">${product.product_id}</p>
                    <p class="order-product-size"> Size : <span class="size-value">${product.size.toUpperCase()}</span></p>
                </div>
                <div class="price-quantity-info">
                    <h5 class="product-price">Price: &nbsp;$${product.price}</h5>
                    <p class="product-quantity">Quantity: &nbsp;${product.count}</p>
                    
                </div>
            </div>
            <hr class="product-divider">
                <div class="price-section d-flex justify-content-end">
                    <span class="subtotal-price">Subtotal: &nbsp;&#36;<span class="subtotal-part">${product.count * product.price}</span></span>
                </div>
            <hr class="product-divider">`;
        accordionBody.appendChild(productDiv);
    }

}

