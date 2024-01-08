document.addEventListener('DOMContentLoaded', function () {
    const toggleSidebarBtn = document.getElementById('store-button');
    const closeSidebarBtn = document.getElementById('close-button'); // Add this line
    const storeSidebarContainer = document.querySelector('.store-rightside-nav-container');
  
    toggleSidebarBtn.addEventListener('click', function () {
        storeSidebarContainer.style.display = 'block'; // Show the sidebar
        setTimeout(() => {
            storeSidebarContainer.style.right = '0'; // Slide in
        }, 10);
    });

    // Close the sidebar when clicking outside
    document.addEventListener('click', function (event) {
        if (!storeSidebarContainer.contains(event.target) && event.target !== toggleSidebarBtn) {
            storeSidebarContainer.style.right = '-100%'; // Slide out
            setTimeout(() => {
                storeSidebarContainer.style.display = 'none'; // Hide the sidebar after sliding out
            }, 300);
        }
    });

    // Close the sidebar when the close button is clicked
    closeSidebarBtn.addEventListener('click', function () {
        storeSidebarContainer.style.right = '-100%'; // Slide out
        setTimeout(() => {
            storeSidebarContainer.style.display = 'none'; // Hide the sidebar after sliding out
        }, 300);
    });
});
