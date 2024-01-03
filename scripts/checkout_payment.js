document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('section');
    const numbertwo = document.getElementById('two2');
    numbertwo.classList.remove('two');

    const button = document.getElementById('nextButton');
    button.innerHTML="PLACE ORDER"
    // Add event listener to the radio button


});
function razorpay(){
    console.log("pAyment")
    const button = document.getElementById('nextButton');
    button.innerHTML="Razor Pay"
    button.style.backgroundColor="black";

}