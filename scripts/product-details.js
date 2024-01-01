const sizeSelectorElement = document.getElementById("size-list");
const selectOptionButton = document.getElementById("select-option-btn");

// Add an event listener to the select element
sizeSelectorElement.addEventListener("change", () => {

    // Check the selected value and enable/disable the button accordingly
    if(sizeSelectorElement.value === 'none') 
        selectOptionButton.setAttribute('disabled','disabled');
    
    else {
        selectOptionButton.removeAttribute('disabled');
        selectOptionButton.innerText = "ADD TO CART";
    }
        
})
document.addEventListener('DOMContentLoaded', () => {
    // Get product ID and API URL from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const apiUrl = urlParams.get('apiUrl');

    // Call a function to fetch product details based on the product ID and API URL
    fetchProductDetail(productId, apiUrl);
});

async function fetchProductDetail(productId, apiUrl) {
    try {
        // Fetch product details based on the product ID and API URL
        let data = await fetch(apiUrl);
        let response = await data.json();

        // Find the product with the matching ID
        const product = response.find(item => item.product_id === productId);

        // Display product details on the page
        updateProductDetail(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

function updateProductDetail(product) {
    // Create HTML elements to display product details
    const productId = document.getElementById('product-id');
    productId.innerText = product.product_id;

    const productTitle = document.getElementById("product-title-h1");
    productTitle.innerText = product.name;

    const productPrice = document.getElementById("product-price");
    productPrice.innerText = `$${product.price}`;

    const productDescription = document.getElementById("accordion-description");
    productDescription.innerText = product.description;
}