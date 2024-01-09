const selectOptionButton = document.getElementById("select-option-btn");
let breadcrumbFirstLink, backButton;
let productId, category;                                                              //global scope

selectOptionButton.removeAttribute('disabled');
selectOptionButton.innerText = "ADD TO CART";

const wishlistBtn = document.getElementById("add-wishlist-btn");
const Wishlist = JSON.parse(sessionStorage.getItem('Wishlist')) || [];

if (Wishlist.find(product => product.product_id === productId) !== undefined)
    wishlistBtn.innerText = "REMOVE FROM WISHLIST";
else
    wishlistBtn.innerText = "ADD TO WISHLIST";



document.addEventListener('DOMContentLoaded', () => {
    // Get product ID and API URL from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    productId = urlParams.get('productId');
    const apiUrl = urlParams.get('apiUrl');
    category = urlParams.get('category');

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
        sessionStorage.setItem('product', JSON.stringify(product));
        // Display product details on the page
        updateProductDetail(product, category);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}




