document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
    const submitButton = document.getElementById('shipAddress');

    const isFormValid = () => {
        // Check the validity of all required form fields
        const requiredFields = form.querySelectorAll('[required]');
        const isValid = Array.from(requiredFields).every((element) => element.checkValidity());
        return isValid;
    };

    form.addEventListener('input', function () {
        // Check if the entire form is valid
        const isValid = isFormValid();

        submitButton.classList.toggle('active', isValid);
    });
});
