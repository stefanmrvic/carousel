import { icon } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faCircleDot } from '../modules/icons.js';

const carousel = document.querySelector('.carousel');
const leftArrow = document.querySelector('.carousel__left-arrow');
const rightArrow = document.querySelector('.carousel__right-arrow');
const circles = document.querySelector('.carousel__circles');

// Declaring isAnimating variable to keep track if carousel transition: translateX animation is running in order to prevent user cutting off animation and causing it to bug out
let isAnimating = false;

leftArrow.addEventListener('click', previousSlide);
rightArrow.addEventListener('click', nextSlide);
circles.addEventListener('click', switchSlides);

// Auto plays the slide every 5 seconds
setInterval(autoPlaySlide, 5000);

function autoPlaySlide() {
    if (isAnimating) return;

    // Setting isAnimating var to prevent carousel from bugging out due to transition of translateX if arrow is pressed in the middle of the animation
    isAnimating = true;

    const carouselXPosition = calculateCarouselPosition();
    let newCarouselXPosition;

    if (carouselXPosition === 0) {
        removeLastSlideIndicator();
        carousel.style.transform = `translateX(${carouselXPosition - 800}px)`;
        newCarouselXPosition = carouselXPosition - 800;
    } else if (carouselXPosition === -800) {
        rightArrow.classList.add('end');
        carousel.style.transform = `translateX(${carouselXPosition - 800}px)`;
        newCarouselXPosition = carouselXPosition - 800;
    } else if (carouselXPosition === -1600) {
        removeLastSlideIndicator();
        carousel.style.transform = `translateX(0px)`;
        leftArrow.classList.add('end');
        newCarouselXPosition = 0;
    }

    changeActiveCircle(newCarouselXPosition);

    // Setting event listener on carousel to listen on transition end and then switch isAnimating to false
    carousel.addEventListener(
        'transitionend',
        () => {
            isAnimating = false;
        },
        { once: true }
    );
}

function nextSlide() {
    const carouselXPosition = calculateCarouselPosition();

    if (carouselXPosition === -1600) return;

    if (isAnimating) return;

    // Setting isAnimating var to prevent carousel from bugging out due to transition of translateX if arrow is pressed in the middle of the animation
    isAnimating = true;

    removeLastSlideIndicator();

    carousel.style.transform = `translateX(${carouselXPosition - 800}px)`;

    const newCarouselXPosition = carouselXPosition - 800;

    if (newCarouselXPosition === -1600) rightArrow.classList.add('end');

    changeActiveCircle(newCarouselXPosition);

    // Setting event listener on carousel to listen on transition end and then switch isAnimating to false
    carousel.addEventListener(
        'transitionend',
        () => {
            isAnimating = false;
        },
        { once: true }
    );
}

function previousSlide() {
    let carouselXPosition = calculateCarouselPosition();

    if (carouselXPosition === 0) return;

    if (isAnimating) return;

    // Setting isAnimating var to prevent carousel from bugging out due to transition of translateX if arrow is pressed in the middle of the animation
    isAnimating = true;

    removeLastSlideIndicator();

    carousel.style.transform = `translateX(${carouselXPosition + 800}px)`;

    const newCarouselXPosition = carouselXPosition + 800;

    if (newCarouselXPosition === 0) leftArrow.classList.add('end');

    changeActiveCircle(newCarouselXPosition);

    // Setting event listener on carousel to listen on transition end and then switch isAnimating to false
    carousel.addEventListener(
        'transitionend',
        () => {
            isAnimating = false;
        },
        { once: true }
    );
}

function removeLastSlideIndicator() {
    if (leftArrow.classList.contains('end')) leftArrow.classList.remove('end');
    else if (rightArrow.classList.contains('end')) {
        rightArrow.classList.remove('end');
    }
}

function calculateCarouselPosition() {
    const computedCarouselPosition =
        window.getComputedStyle(carousel).transform;
    const carouselXPosition = parseInt(computedCarouselPosition.split(',')[4]);

    return carouselXPosition;
}

function switchSlides(e) {
    // If user clicks between the circles, it will return early function call
    if (e.target === circles) return;

    // Setting isAnimating var to prevent carousel from bugging out due to transition of translateX if arrow is pressed in the middle of the animation
    if (isAnimating) return;

    isAnimating = true;

    const firstCircle = '.circle--1';
    const secondCircle = '.circle--2';
    const thirdCircle = '.circle--3';

    if (e.target.closest(firstCircle)) {
        removeLastSlideIndicator();
        carousel.style.transform = `translateX(0px)`;
        leftArrow.classList.add('end');
        changeActiveCircle(0);
    } else if (e.target.closest(secondCircle)) {
        carousel.style.transform = `translateX(-800px)`;
        removeLastSlideIndicator();
        changeActiveCircle(-800);
    } else if (e.target.closest(thirdCircle)) {
        removeLastSlideIndicator();
        carousel.style.transform = `translateX(-1600px)`;
        rightArrow.classList.add('end');
        changeActiveCircle(-1600);
    }

    // Setting event listener on carousel to listen on transition end and then switch isAnimating to false
    carousel.addEventListener(
        'transitionend',
        () => {
            isAnimating = false;
        },
        { once: true }
    );
}

function changeActiveCircle(newCarouselXPosition) {
    removeActiveCircle();

    const activeIcon = icon(faCircleDot).node[0];

    const firstCircle = document.querySelector('.circle--1');
    const firstCircleIcon = firstCircle.querySelector('svg');

    const secondCircle = document.querySelector('.circle--2');
    const secondCircleIcon = secondCircle.querySelector('svg');

    const thirdCircle = document.querySelector('.circle--3');
    const thirdCircleIcon = thirdCircle.querySelector('svg');

    if (newCarouselXPosition === 0) {
        firstCircleIcon.remove();
        firstCircle.append(activeIcon);
        firstCircle.classList.add('active');
    } else if (newCarouselXPosition === -800) {
        secondCircleIcon.remove();
        secondCircle.append(activeIcon);
        secondCircle.classList.add('active');
    } else if (newCarouselXPosition === -1600) {
        thirdCircleIcon.remove();
        thirdCircle.append(activeIcon);
        thirdCircle.classList.add('active');
    }
}

function removeActiveCircle() {
    const activeCircle = document.querySelector('.active');
    const activeCircleIcon = activeCircle.querySelector('svg');

    const inactiveIcon = icon(faCircle).node[0];

    activeCircleIcon.remove();
    activeCircle.append(inactiveIcon);

    activeCircle.classList.remove('active');
}
