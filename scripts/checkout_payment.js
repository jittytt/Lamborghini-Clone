document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('section');
    const numbertwo = document.getElementById('two2');
    numbertwo.classList.remove('two');

    const button = document.getElementById('nextButton');
    button.innerHTML="PLACE ORDER";

    // Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Retrieve the value of the 'amount' parameter
const amount = urlParams.get('amount');
// document.getElementById('totalAmount').innerHTML=("$"+amount);
// Now 'amount' contains the value passed from the previous page




});
function razorpay(){
    console.log("pAyment")
    const button = document.getElementById('nextButton');
    button.innerHTML="Razor Pay";
    button.classList.add('active');
   

}