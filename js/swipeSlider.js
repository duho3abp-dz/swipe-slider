'use strict';

const slidesInfo = [
    { name: 'Test1', src: './img/bottle-1.svg', description: 'Lorem, consectetur adipisicing elit.', price: 1000 },
    { name: 'Test2', src: './img/bottle-2.svg', description: 'Lorem, consectetur adipisicing elit.', price: 1100 },
    { name: 'Test3', src: './img/bottle-3.svg', description: 'Lorem, consectetur adipisicing elit.', price: 1200 },
    { name: 'Test4', src: './img/bottle-4.svg', description: 'Lorem, consectetur adipisicing elit.', price: 1300 },
    { name: 'Test5', src: './img/bottle-5.svg', description: 'Lorem, consectetur adipisicing elit.', price: 1400 },
    { name: 'Test6', src: './img/bottle-6.svg', description: 'Lorem, consectetur adipisicing elit.', price: 1500 },
    { name: 'Test7', src: './img/bottle-7.svg', description: 'Lorem, consectetur adipisicing elit.', price: 1600 },
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

    const window = wrapper.parentElement; // находим окно
    const correctSlidesInfo = checkQuantitySlides(slidesInfo); // изменяем четный массив на нечетный
    const bigSlidesInfo = [ ...correctSlidesInfo, ...correctSlidesInfo, ...correctSlidesInfo ]; // утраиваем массив с информацией для слайдов

    let slidesElems = null; // объявляем переменную для элементов
    let coordinates; // объявляем переменные для координат
    let mousedown = false; // переменная для определения нажатой кнопки мыши
    let start = 0 // стартовая точка (при клике)
    let translateX = 0; // стартовое отклонение обертки
    let deviation = 0; // фактическое отклоннение

    // ================ LOGIC ================ \\

    function checkQuantitySlides(arrow) {
        let newObj = {};
        return arrow.length % 2 ? arrow : arrow.reduce((res, obj, i) => {
            if (i === (arrow.length / 2)) newObj = {...obj};
            return i !== arrow.length - 1 ? [...res, {...obj}] : [...res, {...obj}, {...newObj}];
        }, []);
    }

    const changeFromNegativeNum = (num) => {
        return num < 0 ? num * -1 : num;
    }

    const scaleCalc = (i) => {
        const length = bigSlidesInfo.length; // длина массива
        const half = (length - 1) / 2; // половина массива
        const leftToCenter = changeFromNegativeNum((i) - half) * 2; // осталось до центра массива
        const scale = (10 - leftToCenter) / 10; // scale значение
        return scale && scale > 0 ? scale : 0.1;
    };

    const renderSlide = (wrap, className, src, alt, i) => {
        const slide = document.createElement('li');
        slide.classList.add(className);
        slide.innerHTML = `<img src=${src} alt=${alt}>`;
        slide.draggable = false;
        slide.style.width = '130px'; // CANGE !!!!!!!!!!!!!!!!!!
        slide.style.transform = `scale(${scaleCalc(i)})`;

        // if ((bigSlidesInfo.length - 1) / 2 === i) slide.classList.add(activeClass);

        for (let i = 0; i < slide.children.length; i++) slide.children[i].draggable = false;

        wrap.append(slide);
        return slide;
    };

    const determineCoordinates = (element) => {
        const coordinates = element.getBoundingClientRect(); // находим координаты обертки
        return {
            xStart: coordinates.left, // расчет левой грани слайдера
            xEnd: coordinates.right, // расчет праой грани слайдера
            yStart: coordinates.top, // расчет верхней грани слайдера
            yEnd: coordinates.bottom, // расчет нижней грани слайдера
        };
    };

    const mouseDown = (e) => {
        mousedown = true;
        start = e.pageX;
    };

    const mouseUp = (e) => {
        mousedown = false;
        translateX = deviation;
    };

    const mouseMove = (e) => {
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

        slidesElems.forEach((elem) => {
            const number = elem.style.transform.replace(/\D/igm, '');
            const first = number.slice(0, 1);
            const remainder = number.slice(1);
            const scale = +`${first}.${remainder}`;

            elem.style.transform = `scale(${scale + 0.002})`;
        });
    };

    // ================ INIT ================ \\

    slidesElems = bigSlidesInfo.map(({ name, src }, i) => renderSlide(wrapper, slideClass, src, name, i));

    wrapper.addEventListener('mousedown', mouseDown);
    wrapper.addEventListener('mouseup', mouseUp);
    document.body.addEventListener('mousemove', mouseMove);

    setTimeout(() => {
        spinner.classList.remove(activeClass); // убираем спиннер
        wrapper.classList.add(activeClass); // показываем слайдер
        coordinates = determineCoordinates(window); // находи координаты граней слайдера
    }, displayDelay);
};

document.addEventListener('DOMContentLoaded', () => swipeSlider({ slidesInfo }));