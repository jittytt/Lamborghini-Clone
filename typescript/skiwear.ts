document.addEventListener('DOMContentLoaded', function () {
    let productsContainer:HTMLDivElement = document.querySelector('.products') as HTMLDivElement;
    let apiUrl = 'https://mocki.io/v1/fc7dccf8-8ddb-4545-bacc-6ae55c1e4c86';

    interface Product {
        product_number: number;
        product_id: string;
        name: string;
        price: number;
        offer_price: number | null;
        has_offer: boolean;
        description: string;
        display_image_url_1: string;
        display_image_url_2: string;
        display_image_url_3: string;
        default_image_url: string;
        hover_image_url: string;
        color_one: string;
        color_two: string | null;
        color_three: string | null;
    }

    async function fetchProducts(url: string) {
        try {
            let data = await fetch(url);
            let response: Product[] = await data.json();

            for (let index = 0; index < response.length; index++) {
                let productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <a href="product-details.html?productId=${response[index].product_id}&apiUrl=${url}" class="product-link">
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

                productsContainer.append(productElement);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    fetchProducts(apiUrl);

    function formatPrice(price: number): string {
        return parseFloat(price.toFixed(2)).toLocaleString();
    }

    function changeImage(element: HTMLElement, newSrc: string) {
        const imgElement = element.querySelector('.product-default_image_url') as HTMLImageElement;
        imgElement.style.opacity = '0';
        setTimeout(() => {
            imgElement.src = newSrc;
            imgElement.style.opacity = '1';
        }, 200);
    }

    function restoreImage(element: HTMLElement, originalSrc: string) {
        (element.querySelector('.product-default_image_url') as HTMLImageElement).src = originalSrc;
    }
});
