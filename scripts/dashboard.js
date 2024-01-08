document.addEventListener('DOMContentLoaded', function() {
  const toggleSidebar = document.getElementById('toggleSidebar');
  const sidebar = document.querySelector('.sidebar');

  toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('expanded');
  });
});


