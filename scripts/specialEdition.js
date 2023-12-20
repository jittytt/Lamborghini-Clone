document.addEventListener("DOMContentLoaded", function() { //upon loading the html page
    const slider = document.querySelector('.slider');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    let counter = 1;
    const secnd = document.getElementById(`animet${counter+1}`);
    secnd.style.opacity='0';
    nextBtn.addEventListener('click', () => { //next slide click function
        if (counter >= 1 && counter <= 5) { //  upper limit based on the number of slides
            counter++;
            updateSlider();
            
        }
    });

    prevBtn.addEventListener('click', () => { //previous slide click function
        if (counter > 1) {
            counter--;
            updateSlider();
        }
    });

    function updateSlider() {
        slider.style.transform = `translateX(${-75 * (counter - 1)}%)`;
        if (counter==1){
            const currentSlide = document.getElementById(`animet${counter}`);
            currentSlide.style.opacity='1';
            currentSlide.style.animation= "slideIn 1s ease-out forwards";
            const nexslid = document.getElementById(`animet${counter+1}`);
            nexslid.style.opacity='0';
            nexslid.style.animation='none';
        }
        else{
            const currentSlide = document.getElementById(`animet${counter}`);
            const preSlide = document.getElementById(`animet${counter-1}`);
            const nexSlide = document.getElementById(`animet${counter+1}`);
            currentSlide.style.opacity='1';
            currentSlide.style.animation= "slideIn 1s ease-out forwards";
            preSlide.style.opacity='0';
            nexSlide.style.opacity='0';
            preSlide.style.animation='none';
            nexSlide.style.animation='none';
        }
        
        
       
        
    }
});
