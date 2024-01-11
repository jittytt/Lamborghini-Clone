document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });

    // Apply animation and blur to the current slide's caption
    applyAnimationAndBlur(slides[index]);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);  // Initial display

  // Automatic slide change
  setInterval(nextSlide, 8000);

  document.getElementById('left-icon').addEventListener('click', prevSlide);
  document.getElementById('right-icon').addEventListener('click', nextSlide);

  // Rolling Animation
  function applyAnimationAndBlur(slide) {
    const captionFirstLine = slide.querySelector('.caption-firstline');
    const captionSecondLine = slide.querySelector('.caption-secondline');
    const captionThirdLine = slide.querySelector('.caption-thirdline');

    captionSecondLine.classList.add('rolling-in');
    setTimeout(function () {
      captionFirstLine.classList.add('blurred');
      captionThirdLine.classList.add('blurred');
    }, 1000);
  }
});
