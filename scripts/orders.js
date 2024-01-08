const ordersAccordionContainer = document.getElementById("orders-accordion");
document.addEventListener("DOMContentLoaded", async () => {
    const orders = await fetch("../sample-data/orders.json");
    const orderData = await orders.json();
    console.log(Object.entries(orderData));
    for (const [key, value] of Object.entries(orderData)) {
        const orderAccordion = document.createElement('div');
        orderAccordion.innerHTML = `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading-${key}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${key}" aria-expanded="false" aria-controls="collapse-${key}">
                        <div class="accordion-title w-100 d-flex justify-content-around">
                            <h6>Order Number : ${value["order_id"]}</h6>
                            <h6>Shipment Status : ${value["delivery_date"]}</h6>
                            <h6>Total Price: ${value["total_cost"]}</h6>      
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
            console.log(product);
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
    
})
