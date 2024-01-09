document.addEventListener('DOMContentLoaded', function() {
    let products = document.querySelector('.products');
    let apiUrl = 'https://mocki.io/v1/5b7cc48d-2ad0-4a44-be40-9dffdfc19afe';

    async function fetchProducts(url) {
        try {
            let data = await fetch(url);
            let response = await data.json();

            for (let index = 0; index < response.length; index++) {
                let productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <a href="product-details-other.html?productId=${response[index].product_id}&apiUrl=${url}&category=lamboworld" class="product-link">
                        <img src="${response[index].default_image_url}" alt="" class="product-default_image_url">
                        <center><h2 class="product-name">${response[index].name}</h2></center>
                    </a>
                    <center><p class="product-price">$${formatPrice(response[index].price)}</p></center>
                `;

                productElement.addEventListener('mouseover', () => {
                    changeImage(productElement, response[index].hover_image_url);
                });

                productElement.addEventListener('mouseout', () => {
                    restoreImage(productElement, response[index].default_image_url);
                });

                products.appendChild(productElement);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    fetchProducts(apiUrl);

    function formatPrice(price) {
        return parseFloat(price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function changeImage(element, newSrc) {
        const imgElement = element.querySelector('.product-default_image_url');
        imgElement.style.opacity = 0;
        setTimeout(() => {
            imgElement.src = newSrc;
            imgElement.style.opacity = 1;
        }, 200);
    }

    function restoreImage(element, originalSrc) {
        element.querySelector('.product-default_image_url').src = originalSrc;
    }
});
