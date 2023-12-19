document.addEventListener("DOMContentLoaded", function() {
    const slider = document.querySelector('.slider');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    let counter = 1;

    nextBtn.addEventListener('click', () => {
        if (counter >= 1 && counter <= 5) { // Adjust the upper limit based on the number of slides
            counter++;
            updateSlider();
            
        }
    });

    prevBtn.addEventListener('click', () => {
        if (counter > 1) {
            counter--;
            updateSlider();
        }
    });

    function updateSlider() {
        slider.style.transform = `translateX(${-75 * (counter - 1)}%)`;
        
    }
});
