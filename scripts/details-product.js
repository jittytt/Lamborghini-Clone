"use strict";
const breadcrumbSetting = (firstLinkText, link) => {
    const breadcrumbFirstLink = document.getElementById("breadcrumb-firstlink");
    const backButton = document.getElementById("back-btn");
    if (breadcrumbFirstLink && backButton) {
        breadcrumbFirstLink.innerText = firstLinkText;
        breadcrumbFirstLink.href = link;
        backButton.href = link;
    }
};
function updateProductDetail(product, category) {
    // Create HTML elements to display product details
    document.title = product.name;
    const displayImages = [
        product.display_image_url_1,
        product.display_image_url_2,
        product.display_image_url_3
    ];
    if (category === "man_collection") {
        breadcrumbSetting("OUTERWEAR", "../pages/clothing.html");
    }
    else if (category === "bags") {
        breadcrumbSetting("TRAVEL", "../pages/bagsandluggages.html");
    }
    if (category === "promo") {
        breadcrumbSetting("-30%OFF", "../pages/promo.html");
    }
    if (category === "lamboworld") {
        breadcrumbSetting("MODEL CARS", "../pages/lamboworld.html");
    }
    if (category === "skiwear") {
        breadcrumbSetting("SKIWEAR", "../pages/skiwear.html");
    }
    const breadcrumbListName = document.getElementById("breadcrumb-prodname");
    breadcrumbListName.innerText = product.name;
    const productIdElement = document.getElementById('product-id');
    if (productIdElement) {
        productIdElement.innerText = product.product_id;
    }
    const productTitle = document.getElementById("product-title-h1");
    productTitle.innerText = product.name;
    const productPrice = document.getElementById("product-price");
    productPrice.innerText = `$${product.price}.00`;
    const productDescription = document.getElementById("accordion-description");
    productDescription.innerText = product.description;
    const shapeColor = document.getElementById("hex-shape");
    shapeColor.setAttribute("style", `background-color: ${product.color_one.toLowerCase()}`);
    const imgElements = document.querySelectorAll(".img-container img");
    imgElements.forEach((img, index) => {
        if (displayImages[index]) {
            img.src = displayImages[index];
        }
    });
}
