const breadcrumbSetting = (firstLinkText: string, link: string) => {
    const breadcrumbFirstLink: HTMLAnchorElement | null = document.getElementById("breadcrumb-firstlink") as HTMLAnchorElement;
    const backButton: HTMLAnchorElement | null = document.getElementById("back-btn") as HTMLAnchorElement;
    if (breadcrumbFirstLink && backButton) {
        breadcrumbFirstLink.innerText = firstLinkText;
        breadcrumbFirstLink.href = link;
        backButton.href = link;
    }
};

function updateProductDetail(product: any, category: any) {
    // Create HTML elements to display product details

    document.title = product.name;

    const displayImages: string[] = [
        product.display_image_url_1,
        product.display_image_url_2,
        product.display_image_url_3
    ];

    if (category === "man_collection") {
        breadcrumbSetting("OUTERWEAR", "../pages/clothing.html");
    } else if (category === "bags") {
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

    const breadcrumbListName = document.getElementById("breadcrumb-prodname") as HTMLSpanElement;
    breadcrumbListName.innerText = product.name;

    const productIdElement = document.getElementById('product-id');
    if (productIdElement) {
        productIdElement.innerText = product.product_id;
    }

    const productTitle = document.getElementById("product-title-h1") as HTMLHeadingElement;
    productTitle.innerText = product.name;

    const productPrice = document.getElementById("product-price") as HTMLDivElement;
    productPrice.innerText = `$${product.price}.00`;

    const productDescription = document.getElementById("accordion-description") as HTMLDivElement;
    productDescription.innerText = product.description;

    const shapeColor = document.getElementById("hex-shape") as HTMLElement;
    shapeColor.setAttribute("style", `background-color: ${product.color_one.toLowerCase()}`);

    const imgElements = document.querySelectorAll(".img-container img");
    imgElements.forEach((img, index) => {
        if (displayImages[index]) {
            (img as HTMLImageElement).src = displayImages[index];
        }
    });
}
