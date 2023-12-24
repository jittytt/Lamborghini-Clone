document.addEventListener('DOMContentLoaded', function() {
    // Get product ID and API URL from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const apiUrl = urlParams.get('apiUrl');

    // Call a function to fetch product details based on the product ID and API URL
    fetchProductDetails(productId, apiUrl);
});

async function fetchProductDetails(productId, apiUrl) {
    try {
        // Fetch product details based on the product ID and API URL
        let data = await fetch(apiUrl);
        let response = await data.json();

        // Find the product with the matching ID
        const product = response.find(item => item.product_id === productId);

        // Display product details on the page
        displayProductDetails(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

function displayProductDetails(product) {
    // Create HTML elements to display product details
    const productDetailsContainer = document.getElementById('product-details');
    productDetailsContainer.innerHTML = `
        <img src="${product.default_image_url}" alt="Product Image">
        <h2>${product.name}</h2>
        <p>Price: $${formatPrice(product.price)}</p>
        <p>Description: ${product.description}</p>
        <h3>Alternate Images</h3>
        <img src="${product.display_image_url_1}" alt="Alternate Image 1">
        <img src="${product.display_image_url_2}" alt="Alternate Image 2">
        <img src="${product.display_image_url_3}" alt="Alternate Image 3">
    `;
}

function formatPrice(price) {
    return parseFloat(price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}