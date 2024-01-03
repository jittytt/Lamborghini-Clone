document.addEventListener('DOMContentLoaded', function() {
  const toggleSidebar = document.getElementById('toggleSidebar');
  const sidebar = document.querySelector('.sidebar');

  toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('expanded');
  });
});

function showSecondCheckbox() {
  const generalSubscription = document.getElementById('generalSubscription');
  const interestDiv = document.getElementById('interestDiv');
  if (generalSubscription.checked) {
      interestDiv.style.display = 'block';
  } else {
      interestDiv.style.display = 'none';
      document.getElementById('interestedParty').checked = false; // Uncheck second checkbox if first is unchecked
      document.getElementById('saveButton').disabled = true; // Disable save button if first checkbox is unchecked
  }
} 

function checkSaveButton() {
  const interestedParty = document.getElementById('interestedParty');
  const saveButton = document.getElementById('saveButton');
  
  if (interestedParty.checked) {
      saveButton.disabled = false;
  } else {
      saveButton.disabled = true;
  }
}
