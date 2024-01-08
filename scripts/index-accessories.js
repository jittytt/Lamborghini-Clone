document.addEventListener('DOMContentLoaded', function () {
    let productsContainer = document.querySelector('#accessories-tab-div-gen');
    let apiUrl = 'https://mocki.io/v1/d4898726-d6e7-4577-a642-5c02feb7e061';

    async function fetchProducts(url) {
        try {
            let data = await fetch(url);
            let response = await data.json();

            for (let index = 0; index < response.length; index++) {
                let productElement = document.createElement('div');
                productElement.classList.add('card');
                productElement.style = 'width: 18rem;';
                productElement.onmouseover = function () {
                    changeImage(this, response[index].hover_image_url);
                };
                productElement.onmouseout = function () {
                    restoreImage(this, response[index].default_image_url);
                };
                productElement.innerHTML = generateCardTemplate(response[index]);

                productsContainer.appendChild(productElement); // Append to the container
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    fetchProducts(apiUrl);

    function formatPrice(price) {
        return parseFloat(price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function generateCardTemplate(product) {
        return `
        <a href="/pages/product-details.html?productId=${product.product_id}&apiUrl=${apiUrl}" class="product-link">
        <img class="card-img-top" src="${product.default_image_url}" alt="Card image cap">
        <div class="card-body">
            <center>
                <p class="product-title">${product.name}</p>
            </center>
            <center>
                <p class="product-price">&#36;${formatPrice(product.price)}</p>
            </center>
        </div>
    </a>
        `;
    }

    function changeImage(element, newSrc) {
        const imgElement = element.querySelector('.card-img-top');
        imgElement.style.opacity = 0;
        setTimeout(() => {
            imgElement.src = newSrc;
            imgElement.style.opacity = 1;
        }, 200);
    }

    function restoreImage(element, originalSrc) {
        element.querySelector('.card-img-top').src = originalSrc;
    }
});
