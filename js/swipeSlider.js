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
    // ================ STATE ================ \\

    const wrapper = document.querySelector(sliderWrapElem); // нахолдим обертку
    const spinner = document.querySelector(spinnerElem); // нахолдим спинер

    if (!wrapper || !slidesInfo.length || !spinner ) return console.log('Swipe slider dont worke, because not founed some props');

    let coordinates; // объявляем переменные для координат
    let mousedown = false; // переменная для определения нажатой кнопки мыши
    let start = 0 // стартовая точка (при клике)
    let translateX = 0; // стартовое отклонение обертки
    let deviation = 0; // фактическое отклоннение

    // ================ LOGIC ================ \\

    const renderSlide = (wrap, className, src, alt) => {
        const slide = document.createElement('li');
        slide.classList.add(className);
        slide.innerHTML = `<img src=${src} alt=${alt}>`;
        slide.draggable = false;
        slide.style.width = '130px'; // CANGE !!!!!!!!!!!!!!!!!!

        for (let i = 0; i < slide.children.length; i++) slide.children[i].draggable = false;

        wrap.append(slide);
    };

    const determineCoordinates = () => {
        const coordinates = wrapper.getBoundingClientRect(); // находим координаты обертки
        return {
            xStart: coordinates.left, // расчет левой грани слайдера
            xEnd: coordinates.right, // расчет праой грани слайдера
            yStart: coordinates.top, // расчет верхней грани слайдера
            yEnd: coordinates.bottom, // расчет нижней грани слайдера
        };
    };

    // ================ INIT ================ \\

    slidesInfo.map(({ name, src }) => renderSlide(wrapper, slideClass, src, name));

    

    wrapper.addEventListener('mousedown', (e) => {
        mousedown = true;
        start = e.pageX;
    })

    wrapper.addEventListener('mouseup', (e) => {
        mousedown = false;
        translateX = deviation;
    })

    document.body.addEventListener('mousemove', (e) => {
        if (!mousedown) return;

        const { xStart, xEnd, yStart, yEnd } = coordinates;
        const x = e.clientX; // находим ось X
        const y = e.clientY; // находим ось Y

        if (x >= xEnd || x <= xStart || y >= yEnd || y <= yStart) {
            translateX = deviation;
            mousedown = false;
            return;
        }

        deviation = translateX + (x - start);

        wrapper.style.transform = `translateX(${deviation}px)`;
    });

    setTimeout(() => {
        spinner.classList.remove(activeClass); // убираем спиннер
        wrapper.classList.add(activeClass); // показываем слайдер
        coordinates = determineCoordinates(); // находи координаты граней слайдера
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