const toggleButton = document.getElementById('toggleSidebar');
const sidebar = document.querySelector('.sidebar');

toggleButton.addEventListener('click', function() {
  sidebar.classList.toggle('expanded');
});