import IndicatorsWeather from "../IndicatorsWeather/IndicatorsWeather.js";
import ExtraInfoAir from "../ExtraInfoAir/ExtraInfoAir.js";
import WeatherToday from "../WeatherToday/WeatherToday.js";

export default function PopupWeather(data = data, lat, lon, timezone) {
    const popup = document.querySelector('.popup');
    const popupClose = document.querySelector('.popup-close');
    popup.classList.add('popup-active');

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            document.querySelector(`.popup`).classList.remove(`popup-active`);
            document.querySelector('main').style.display = 'block';
            document.querySelector('header').style.overflow = 'initial';
        }
    })

    document.querySelector('header').style.overflow = 'hidden';
    document.querySelector('main').style.display = 'none';

    popupClose.addEventListener('click', () => {
        popup.classList.remove('popup-active');
        document.querySelector('main').style.display = 'block';
        document.querySelector('header').style.overflow = 'initial';
    });

    const date = new Date(data[0].dt_txt).getDate();

    ExtraInfoAir({ className: 'weather-after__air', speed: data[0].wind.speed, deg: data[0].wind.deg, gust: data[0].wind.gust });

    IndicatorsWeather({
        className: 'weather-after__list-extra-info', listIndicatorsWeather: [
            {
                img: './image/humidity.svg',
                title: 'вологість',
                symbol: '%',
                text: data[0].main.humidity,
            },
            {
                img: './image/pressure.svg',
                title: 'тиск',
                symbol: 'Пск',
                text: data[0].main.pressure,
            },
            {
                img: './image/thermometer.svg',
                title: 'відчувається, як',
                symbol: 'celsius',
                text: data[0].main.feels_like,
            },
            {
                img: './image/visibility.svg',
                title: 'видимість',
                symbol: 'Км',
                text: (data[0].visibility / 1000),
            },
        ]
    });

    WeatherToday({ className: 'weather-today-body', listData: data, date: date, lat: lat, lon: lon, timezone: timezone });
};