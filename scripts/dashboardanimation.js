"use strict";
function showSecondCheckbox() {
    const generalSubscription = document.getElementById('generalSubscription');
    const interestDiv = document.getElementById('interestDiv');
    if (generalSubscription.checked) {
        interestDiv.style.display = 'block';
    }
    else {
        interestDiv.style.display = 'none';
        const interestedParty = document.getElementById('interestedParty');
        interestedParty.checked = false; // Uncheck second checkbox if first is unchecked
    }
}
function checkSaveButton() {
    console.log("Clicked");
    const interestedParty = document.getElementById('saveButton');
    interestedParty.classList.add("enable-save");
}
