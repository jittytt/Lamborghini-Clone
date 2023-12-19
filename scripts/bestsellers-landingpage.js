function initializeTabs() {
    // Set the initial active tab to 'clothing'
    selectTab('clothing');
}

document.addEventListener('DOMContentLoaded', initializeTabs);

function selectTab(tabId) {
    // Remove 'active' class from all tabs
    document.querySelectorAll('.nav-link').forEach(function (ele) {
        ele.classList.remove('active');
    });

    // Add 'active' class to the selected tab
    document.getElementById(`${tabId}-tab`).classList.add('active');

    // Set the border color for the parent nav-item
    document.querySelectorAll('.nav-item').forEach(function (item) {
        item.style.borderBottomColor = ''; // Reset the border color for all items
    });

    // Set the border color for the active tab's parent nav-item
    document.getElementById(`${tabId}-tab`).parentElement.style.borderBottomColor = 'black';

    // Show the corresponding content
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
    }, 150); // Adjust the delay to match the transition duration
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

