"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', function () {
    let productsContainer = document.querySelector('.products');
    let apiUrl = 'https://mocki.io/v1/2d301347-5de0-44b6-9dfa-b826fd70cf00';
    function fetchProducts(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield fetch(url);
                let response = yield data.json();
                for (let index = 0; index < response.length; index++) {
                    let productElement = document.createElement('div');
                    productElement.classList.add('product');
                    productElement.innerHTML = `
                    <a href="product-details.html?productId=${response[index].product_id}&apiUrl=${url}&category=skiwear" class="product-link">
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
            }
            catch (error) {
                console.error('Error fetching products:', error);
            }
        });
    }
    fetchProducts(apiUrl);
    function formatPrice(price) {
        return parseFloat(price.toFixed(2)).toLocaleString();
    }
    function changeImage(element, newSrc) {
        const imgElement = element.querySelector('.product-default_image_url');
        imgElement.style.opacity = '0';
        setTimeout(() => {
            imgElement.src = newSrc;
            imgElement.style.opacity = '1';
        }, 200);
    }
    function restoreImage(element, originalSrc) {
        element.querySelector('.product-default_image_url').src = originalSrc;
    }
});
