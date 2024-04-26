import { getDataInLon, getDataInName } from '../../servers/callServer.js';
import initialApp from '../../app.js';
import debunce from '../../utils/debunce.js';
import clearDOMNodes from '../../utils/clearDOMNodes.js';
import { API_WEATHER_LON_NOW, KEY_NOW, API_WEATHER_LON_AFTER, KEY_AFTER, API_WEATHER_NAME_NOW, API_WEATHER_NAME_AFTER } from '../../config/url.js';

function closePopup(name, clearClass, clearNode = null) {
    document.addEventListener('click', (e) => {
        if (!(e.target.closest(`${name}`))) {
             clearDOMNodes(`${clearNode}`);
             document.querySelector(`${name}`).classList.remove(`${clearClass}`);   
        }
    });
}

//burger menu

function closeBurger(){
    const burger = document.querySelector('.burger');
    const bodyMenu = document.querySelector('.header__body');
    burger.classList.remove('burger-active');
    bodyMenu.classList.remove('body-menu-active');
    document.body.classList.remove('hidden');
}

(function () {
    const burger = document.querySelector('.burger');
    const bodyMenu = document.querySelector('.header__body');
    burger.addEventListener('click', () => {
        burger.classList.toggle('burger-active');
        bodyMenu.classList.toggle('body-menu-active');
        document.body.classList.toggle('hidden');
    })

})();

//getting data in location

(function gettingLocation() {
    const button = document.querySelector('.header__btn');
    button.addEventListener('click', () => {
        closeBurger();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const data = pos.coords;
                let { latitude, longitude } = data;
                const dataWeatherNow = getDataInLon(latitude, longitude, API_WEATHER_LON_NOW, KEY_NOW);
                const dataWeatherAfter = getDataInLon(latitude, longitude, API_WEATHER_LON_AFTER, KEY_AFTER);
                initialApp(dataWeatherNow, dataWeatherAfter);
            });
        }
    })
})();

//change theme

(function () {
    const theme = document.querySelector('.theme');
    const indentifier = theme.children[0].children[0];
    const tagImage = document.querySelector('.theme__img img');

    if (localStorage.getItem('theme') === 'dark') {
        theme.classList.add('theme-active');
        document.body.classList.add('dark');
        indentifier.style.left = '95%';
        indentifier.style.transform = 'translate(-100%, -50%)';
        tagImage.src = './image/theme-icon-moon.svg';
    }

    theme.addEventListener('click', () => {
        closeBurger();
        if (!theme.matches('[class$="theme-active"')) {
            theme.classList.add('theme-active');
            document.body.classList.add('dark');

            localStorage.setItem('theme', 'dark');

            indentifier.style.left = '95%';
            indentifier.style.transform = 'translate(-100%, -50%)';
            tagImage.src = './image/theme-icon-moon.svg';
        } else {
            theme.classList.remove('theme-active');
            document.body.classList.remove('dark');

            localStorage.setItem('theme', '');

            indentifier.style.left = '5%';
            indentifier.style.transform = 'translate(0%, -50%)';
            tagImage.src = './image/theme-icon-sun.svg';
        }
    });
})();


//seach 

(function initialSeach() {
    const seachInput = document.querySelector('.form-seach__input');
    const list = document.querySelector('.form-seach__list');
    const wrapperSeachForm = document.querySelector('.form-seach__wrapper');

    closePopup('.form-seach__wrapper', 'form-seach__active', '.form-seach__item');

    async function sendData(e) {
        const result = await getDataInName(e.target.value, API_WEATHER_NAME_NOW, KEY_NOW);
        if (result.length > 0) {
            clearDOMNodes('.form-seach__item');
            wrapperSeachForm.classList.add('form-seach__active');
            const nameCity = [];

            result.forEach((item, _) => {
                nameCity.push(`
                <li class='form-seach__item'>
                 <div class='form-seach__icon'>
                  <img src='./image/icon-location.svg'>
                 </div>
                  <div class='form-seach__info'>
                    <p class='form-seach__name'>${item.name}</p>
                    <p class='form-seach__extra-info'>${item.name} <span>${item.country}</span></p>
                  </div>
                </li>
            `);
            });

            for (let i = 0; i < nameCity.length; i++) {
                list.insertAdjacentHTML('beforeend', nameCity[i]);
            }

            changeShowWeather();

        } else {
            clearDOMNodes('.form-seach__item');
            wrapperSeachForm.classList.remove('form-seach__active');
        }
    }

    sendData = debunce(sendData, 200);

    seachInput.addEventListener('input', sendData);
})();

function changeShowWeather() {
    const listItemSeach = document.querySelectorAll('.form-seach__item');
    if (listItemSeach.length > 0) {
        listItemSeach.forEach((item, index) => {
            item.addEventListener('click', async (e) => {

                const name = document.querySelectorAll('.form-seach__name')[index].innerHTML;
                const cityCoordinateNow = await getDataInName(name, API_WEATHER_NAME_NOW, KEY_NOW);
                const cityNow = await getDataInLon(cityCoordinateNow[index].lat, cityCoordinateNow[index].lon, API_WEATHER_LON_NOW, KEY_NOW);

                const cityCoordinateAfter = await getDataInName(name, API_WEATHER_NAME_AFTER, KEY_AFTER);
                const cityAfter = await getDataInLon(cityCoordinateAfter[index].lat, cityCoordinateAfter[index].lon, API_WEATHER_LON_AFTER, KEY_AFTER);

                initialApp(cityNow, cityAfter);
                clearDOMNodes('.form-seach__item');
                document.querySelector('.form-seach__wrapper').classList.remove('form-seach__active');
            });
        })
    }
};