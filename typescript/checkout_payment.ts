document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('section') as HTMLElement;
    const numbertwo = document.getElementById('two2') as HTMLElement;
    numbertwo.classList.remove('two');

    const button = document.getElementById('nextButton') as HTMLButtonElement;
    button.innerHTML = "PLACE ORDER";

    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Retrieve the value of the 'amount' parameter
    const amount = urlParams.get('amount');
    document.getElementById('totalAmount')!.innerHTML = ("$" + amount);
    // Now 'amount' contains the value passed from the previous page
});

const razorpay = () => {
    console.log("razorpay");
    const button = document.getElementById('nextButton') as HTMLButtonElement;
    button.innerHTML = "Razor Pay";
    button.style.pointerEvents = "auto";
    button.style.background = "black";
    button.classList.add('active');
};

const otherPayments = () => {
    console.log("other payments");
    const button = document.getElementById('nextButton') as HTMLButtonElement;
    button.innerHTML = "Pay now";
    button.style.pointerEvents = "none";
    button.style.background = "black";
    // button.classList.add('active');
};
