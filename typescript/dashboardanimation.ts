function showSecondCheckbox(): void {
    const generalSubscription: HTMLInputElement = document.getElementById('generalSubscription') as HTMLInputElement;
    const interestDiv: HTMLElement = document.getElementById('interestDiv') as HTMLElement;
    
    if (generalSubscription.checked) {
      interestDiv.style.display = 'block';
    } else {
      interestDiv.style.display = 'none';
      const interestedParty: HTMLInputElement = document.getElementById('interestedParty') as HTMLInputElement;
      interestedParty.checked = false; // Uncheck second checkbox if first is unchecked
    }
  }
  
  function checkSaveButton(): void {
    console.log("Clicked");
    const interestedParty: HTMLElement = document.getElementById('saveButton') as HTMLElement;
    interestedParty.classList.add("enable-save");
  }
  