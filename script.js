/*
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY; // Get the current scroll position
    const nameContainer = document.querySelector('.content'); // Select the name container
    const aboutMe = document.querySelector('.aboutmetext'); // Select the name container
    const screenWidth = window.innerWidth; // Get the current screen width
    const maxTranslation = screenWidth * 0.9; // 90% of the screen width

    // Calculate the new font size based on scroll position, capped at 100px
    const newSize = 1 + Math.min(scrollPosition / 200, 1) * 0.2; // 1 to 1.5
    nameContainer.style.fontSize = `${newSize}em`; 

    // Move the name and skills up by 30 pixels based on scroll position
    nameContainer.style.transform = `translateY(${-Math.min(scrollPosition, 200)}px)`; 
    aboutMe.style.transform = `translateX(${-Math.min(scrollPosition * 3, maxTranslation)}px)`; 
});*/