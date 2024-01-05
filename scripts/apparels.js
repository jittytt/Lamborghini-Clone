document.getElementById('watch-video-button').addEventListener('click', function() {
    // Hide the banner content
    document.getElementById('banner-container').style.display = 'none';

    // Show the video
    const video = document.getElementById('video');
    video.classList.remove('hidden');
    video.play();
});
