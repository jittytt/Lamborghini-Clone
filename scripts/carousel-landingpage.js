document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;
  let currentSlide = 0;
  let isDragging = false;
  let startPositionX = 0;

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

  // Initial display
  showSlide(currentSlide);

  // Automatic slide change
  setInterval(nextSlide, 8000);

  // Event listeners for manual control
  document.getElementById('left-icon').addEventListener('click', prevSlide);
  document.getElementById('right-icon').addEventListener('click', nextSlide);

  // Event listeners for dragging
  slides.forEach((slide) => {
    slide.addEventListener('mousedown', (e) => {
      isDragging = true;
      startPositionX = e.clientX;
    });

    slide.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - startPositionX;
        if (deltaX > 50) {
          nextSlide();
          isDragging = false;
        } else if (deltaX < -50) {
          prevSlide();
          isDragging = false;
        }
      }
    });

    slide.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Change cursor to pointer when over the image
    slide.style.cursor = 'pointer';
  });

  // Function to apply rolling-in animation and blur effect to caption lines
  function applyAnimationAndBlur(slide) {
    const captionFirstLine = slide.querySelector('.caption-firstline');
    const captionSecondLine = slide.querySelector('.caption-secondline');
    const captionThirdLine = slide.querySelector('.caption-thirdline');

    // Add class for rolling-in animation to caption-secondline
    captionSecondLine.classList.add('rolling-in');

    // After a delay, add class for blur effect to caption-firstline and caption-thirdline
    setTimeout(function () {
      captionFirstLine.classList.add('blurred');
      captionThirdLine.classList.add('blurred');
    }, 1000); // Adjust the delay as needed
  }
});
