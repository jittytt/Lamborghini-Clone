const selectOptionButton = document.getElementById("select-option-btn");
const sizeSelectorElement = document.getElementById("size-list");
let breadcrumbFirstLink, backButton;
let productId, category;                                                              //global scope

// Add an event listener to the select element
sizeSelectorElement.addEventListener("change", (event) => {
    // Check the selected value and enable/disable the button accordingly
    const previousProductSize = JSON.parse(sessionStorage.getItem('size'));
    const previousSize = previousProductSize[productId].size;
    if (sizeSelectorElement.value === 'none' && previousSize !== 'none') {
        selectOptionButton.setAttribute('disabled', 'disabled');
        sizeSelectorElement.value = previousSize; // previous size value
        var event = new Event('change');
        sizeSelectorElement.dispatchEvent(event);
    }
    else if(sizeSelectorElement.value !== 'none') {
        selectOptionButton.removeAttribute('disabled');
        selectOptionButton.innerText = "ADD TO CART";
        const productSize = {[productId]: {productId, 'size': sizeSelectorElement.value}};
        sessionStorage.setItem('size',JSON.stringify(productSize)); 
    }
    const productSize = JSON.parse(sessionStorage.getItem('size'));
    const size = productSize[productId].size;
    const wishlistBtn = document.getElementById("add-wishlist-btn");
    const Wishlist = JSON.parse(sessionStorage.getItem('Wishlist')) || [];

    if (Wishlist.find(product => product.product_id === productId && product.size === size) !== undefined)
        wishlistBtn.innerText = "REMOVE FROM WISHLIST";
    else
        wishlistBtn.innerText = "ADD TO WISHLIST";
})


document.addEventListener('DOMContentLoaded', () => {
    // Get product ID and API URL from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    productId = urlParams.get('productId');
    const apiUrl = urlParams.get('apiUrl');
    category = urlParams.get('category');
    console.log(productId);
    console.log(apiUrl);

    // Call a function to fetch product details based on the product ID and API URL
    fetchProductDetail(productId, apiUrl);
    const productSizeRetreived = JSON.parse(sessionStorage.getItem('size'));

    if(!productSizeRetreived?.[productId]) {
        sizeSelectorElement.value = 'none';
        const productSize = {[productId]: {productId, 'size': sizeSelectorElement.value}};
        sessionStorage.setItem('size', JSON.stringify(productSize));   
    }   
    else {
        
        sizeSelectorElement.value = productSizeRetreived[productId].size;
    }
        
    var event = new Event('change');
    sizeSelectorElement.dispatchEvent(event);
});

async function fetchProductDetail(productId, apiUrl) {
    try {
        // Fetch product details based on the product ID and API URL
        let data = await fetch(apiUrl);
        let response = await data.json();

        // Find the product with the matching ID
        const product = response.find(item => item.product_id === productId);
        sessionStorage.setItem('product', JSON.stringify(product));
        // Display product details on the page
        updateProductDetail(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}




