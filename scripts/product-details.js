const sizeSelectorElement = document.getElementById("size-list");
const selectOptionButton = document.getElementById("select-option-btn");
let productId;                                                              //global scope

// Add an event listener to the select element
sizeSelectorElement.addEventListener("change", (event) => {
    // Check the selected value and enable/disable the button accordingly
    if (sizeSelectorElement.value === 'none') {
        selectOptionButton.setAttribute('disabled', 'disabled');
        sizeSelectorElement.value = sessionStorage.getItem('size'); // previous size value
        var event = new Event('change');
        sizeSelectorElement.dispatchEvent(event);
    }
    else {
        selectOptionButton.removeAttribute('disabled');
        selectOptionButton.innerText = "ADD TO CART";
        sessionStorage.setItem('size', sizeSelectorElement.value);
    }
    const size = sessionStorage.getItem('size');
    const wishlistBtn = document.getElementById("add-wishlist-btn");
    const Wishlist = JSON.parse(sessionStorage.getItem('Wishlist'));

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

    // Call a function to fetch product details based on the product ID and API URL
    fetchProductDetail(productId, apiUrl);
    sizeSelectorElement.value = 'none';

    if(document.referrer === '')
        sizeSelectorElement.value = sessionStorage.getItem('size');
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

function updateProductDetail(product) {
    // Create HTML elements to display product details

    var displayImages = [product.display_image_url_1,
    product.display_image_url_2,
    product.display_image_url_3];


    const breadcrumbListName = document.getElementById("breadcrumb-prodname");
    breadcrumbListName.innerText = product.name;

    const productId = document.getElementById('product-id');
    productId.innerText = product.product_id;

    const productTitle = document.getElementById("product-title-h1");
    productTitle.innerText = product.name;

    const productPrice = document.getElementById("product-price");
    productPrice.innerText = `$${product.price}.00`;

    const productDescription = document.getElementById("accordion-description");
    productDescription.innerText = product.description;

    const shapeColor = document.getElementById("hex-shape");
    if (product.price > 300)
        shapeColor.setAttribute("style", "background-color: var(--main-bg-color)");

    const imgElements = document.querySelectorAll(".img-container img");
    imgElements.forEach((img, index) => {
        if (displayImages[index])
            img.src = displayImages[index];
    })
}