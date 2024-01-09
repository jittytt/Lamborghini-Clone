async function fetchCountries() {
    const response = await fetch('https://mocki.io/v1/840dcce9-e149-4614-8724-27f8f57a7143');
    const data = await response.json();
    return data.countries;
}

async function populateCountries() {
    const countries = await fetchCountries();
    const countryInput = document.getElementById('country');
    const phonePrefixSelect = document.getElementById('phonePrefix');

    // Add autocomplete attribute for better user experience
    countryInput.setAttribute('autocomplete', 'off');

    countryInput.addEventListener('input', () => {
        updateStatesAndPhonePrefix();
    });

    // Initialize phone prefix based on the default country on page load
    updatePhonePrefix(getPhonePrefixForCountry(countries[0].name));

    updateStatesAndPhonePrefix();
}

function updateStatesAndPhonePrefix() {
    const selectedCountry = document.getElementById('country').value.trim();
    const states = getStatesForCountry(selectedCountry);
    const phonePrefix = getPhonePrefixForCountry(selectedCountry);

    updateStatesDropdown(states);
    updatePhonePrefix(phonePrefix);
}

function updateStatesDropdown(states) {
    const stateSelect = document.getElementById('state');
    stateSelect.innerHTML = '';
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });
}

function updatePhonePrefix(phonePrefix) {
    const phonePrefixSelect = document.getElementById('phonePrefix');
    phonePrefixSelect.value = phonePrefix;
}

function getStatesForCountry(country) {
    // Replace this with actual logic to fetch states from your API
    // For now, return a mock array
    const countryData = getCountriesData(); // Mock function to get countries data
    const selectedCountry = countryData.find(c => c.name === country);
    return selectedCountry ? selectedCountry.states : [];
}

function getPhonePrefixForCountry(country) {
    // Replace this with actual logic to fetch phone prefix from your API
    // For now, return a mock value
    const countryData = getCountriesData(); // Mock function to get countries data
    const selectedCountry = countryData.find(c => c.name === country);
    return selectedCountry ? selectedCountry.prefix : '';
}

function getCountriesData() {
    // Mock function to get countries data
    return [
        {
            name: "India",
            states: ["State1", "State2", "State3"],
            prefix: "+91"
        },
        // Add more countries with states and phone prefix as needed
    ];
}

window.addEventListener('load', populateCountries);
