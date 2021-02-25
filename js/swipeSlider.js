'use strict';

const slidesInfo = [
    { name: 'Test1', src: './img/bottle-1.svg', description: 'Lorem, consectetur adipisicing elit.', price: 1000 },
    { name: 'Test2', src: './img/bottle-2.svg', description: 'Lorem, consectetur adipisicing elit.', price: 1100 },
    { name: 'Test3', src: './img/bottle-3.svg', description: 'Lorem, consectetur adipisicing elit.', price: 1200 },
    { name: 'Test4', src: './img/bottle-4.svg', description: 'Lorem, consectetur adipisicing elit.', price: 1300 },
    { name: 'Test5', src: './img/bottle-5.svg', description: 'Lorem, consectetur adipisicing elit.', price: 1400 },
    { name: 'Test6', src: './img/bottle-6.svg', description: 'Lorem, consectetur adipisicing elit.', price: 1500 },
    { name: 'Test7', src: './img/bottle-7.svg', description: 'Lorem, consectetur adipisicing elit.', price: 1600 }
];

const swipeSlider = ({
    sliderWrapElem = '[data-swipe-wrap]', // обертка для слайдов
    slideClass = 'swipe-slider__slide', // класс слайда
    spinnerElem = '[data-swipe-spinner]', // блок со спиннером
    activeClass = 'active', // активный класс
    displayDelay = 500, // задержка отображения окна со слайдами (ms)
    slidesInfo // данные слайдов
} = {}) => {
    const wrapper = document.querySelector(sliderWrapElem);
    const spinner = document.querySelector(spinnerElem);

    if (!wrapper || !slidesInfo.length || !spinner ) return console.log('Swipe slider dont worke, because not founed some props');

    const renderSlide = (wrap, className, src, alt) => {
        const slide = document.createElement('li');
        slide.classList.add(className);
        slide.innerHTML = `<img src=${src} alt=${alt}>`;
        slide.draggable = false;

        for (let i = 0; i < slide.children.length; i++) slide.children[i].draggable = false;

        wrap.append(slide);
    };

    slidesInfo.map(({ name, src }) => renderSlide(wrapper, slideClass, src, name));

    wrapper.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();

        // console.dir(e);
    });

    setTimeout(() => {
        spinner.classList.remove(activeClass);
        wrapper.classList.add(activeClass)
    }, displayDelay);
};

document.addEventListener('DOMContentLoaded', () => {
    swipeSlider({ slidesInfo });
});


{/* <div class="card__info">
    <h5 class="card__name">Test1</h5>
    <p class="card__description">Lorem, consectetur adipisicing elit.</p>
    <div class="card__price">1000 ₽</div>
</div> */}