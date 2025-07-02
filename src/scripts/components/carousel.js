function nextSlide() {
    const carousel = document.querySelector('.carousel');
    const computedCarouselPosition =
        window.getComputedStyle(carousel).transform;
    const carouselXPosition = parseInt(computedCarouselPosition.split(',')[4]);
    console.log(carouselXPosition);

    if (carouselXPosition === -1600) return;

    carousel.style.transform = `translateX(${carouselXPosition - 800}px)`;
}

function previousSlide() {
    const carousel = document.querySelector('.carousel');
    const computedCarouselPosition =
        window.getComputedStyle(carousel).transform;
    const carouselXPosition = parseInt(computedCarouselPosition.split(',')[4]);
    console.log(carouselXPosition);

    if (carouselXPosition === 0) return;

    carousel.style.transform = `translateX(${carouselXPosition + 800}px)`;
}
