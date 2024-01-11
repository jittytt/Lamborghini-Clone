function initializeTabs() {
    // Set the initial active tab to 'clothing'
    selectTab('clothing');
}

document.addEventListener('DOMContentLoaded', initializeTabs);

function selectTab(tabId) {
    document.querySelectorAll('.nav-link').forEach(function (ele) {
        ele.classList.remove('active');
    });

    document.getElementById(`${tabId}-tab`).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(function (item) {
        item.style.borderBottomColor = '';
    });

    document.getElementById(`${tabId}-tab`).parentElement.style.borderBottomColor = 'black';

    
    document.querySelectorAll('.tab-pane').forEach(function (content) {
        content.classList.remove('show', 'active');
    });
    document.getElementById(`${tabId}`).classList.add('show', 'active');
}

function changeImage(element, newSrc) {
    const imgElement = element.querySelector('.card-img-top');
    imgElement.style.opacity = 0;
    setTimeout(() => {
        imgElement.src = newSrc;
        imgElement.style.opacity = 1;
    }, 150);
}

function restoreImage(element, originalSrc) {
    element.querySelector('.card-img-top').src = originalSrc;
}

function scrollCards(scrollAmount) {
    const container = document.querySelector('.scroll-container');
    const activeTabId = document.querySelector('.tab-pane.show.active').id;

    if (activeTabId === 'clothing') {
        // For Clothing tab
        container.scrollLeft += scrollAmount;
    } else if (activeTabId === 'collectibles') {
        // For Collectibles tab
        const collectiblesContainer = document.querySelector('#collectibles .scroll-container');
        collectiblesContainer.scrollLeft += scrollAmount;
    }
}

