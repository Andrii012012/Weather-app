import clearDOMNodes from "../../utils/clearDOMNodes.js";
import {STATE_WEATHER_DAY} from "../../constants/weatherIcons.js";
import { calcKelvin } from "../../utils/calcTemp.js";
import PopupWeather from "../PopupWeather/PopupWeather.js";
import addArrayHTML from "../../utils/addArrayHTML.js";

export default function WeatherForecast(props) {
    let { list, lat, lon, timezone } = props;
    const sectionWeatherForecast = document.querySelector('.weather-forecast');
    clearDOMNodes('.weather-forecast__item');

    const infoWeatherDay = [];

    const listOnWeek = [];

    const nowDate = new Date().getDate();

    let options = {
        month: 'short',
        weekday: 'short',
    }

    function setUppercase(text) {
      
            const resultText = text.trim();
            const arraySymbol = [];
            for (let i = 0; i < resultText.length; i++) {
                if (i === 0) {
                    arraySymbol.push(String(resultText[i]).toUpperCase());
                } else {
                    arraySymbol.push(resultText[i]);
                }
            }
            return arraySymbol.join('');        
    }

    for (let i = 0; i < list.length; i++) {
        const date = new Date(list[i].dt_txt).getDate();
        const hours = new Date(list[i].dt_txt).getHours();
        if (date !== nowDate && hours === 12) {
            listOnWeek.push(list[i]);
        }
    }

    for (let i = 0; i < listOnWeek.length; i++) {

        const country = listOnWeek[i].sys.country;

        const dayNumber = new Date(listOnWeek[i].dt_txt).getDate();

        const date = new Date(listOnWeek[i].dt_txt).toLocaleString(country, options);

        infoWeatherDay.push(`
          <li class='weather-forecast__item'>
            <div class='weather-forecast__body-info'>
              <img class='weather-forecast__img weather-img' src='${STATE_WEATHER_DAY.get(listOnWeek[i].weather[0].description)}'>
              <p class='weather-forecast__temp'>${calcKelvin(listOnWeek[i].main.temp)}</p>
            </div>
            <div class='weather-forecast__body-date text-info'><p class='weather-forecast__date'>${dayNumber}</p> <span>${setUppercase(date.split(' ')[0])}</span> <p>${setUppercase(date.split(' ')[1])}</p></div>
          </li>
      `)
    }

    addArrayHTML(infoWeatherDay, sectionWeatherForecast);

    moreInfo(list, lat, lon, timezone);
};

//open weather after info

function moreInfo(list, lat, lon, timezone) {
    const items = document.querySelectorAll('.weather-forecast__item');
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            const weatherInfo = [];
            const weatherDate = document.querySelectorAll('.weather-forecast__date')[index];
            for (let i = 0; i < list.length; i++) {
                const date = new Date(list[i].dt_txt).getDate();
                if (date === Number(weatherDate.innerHTML)) {
                    weatherInfo.push(list[i]);
                }
            }
            PopupWeather(weatherInfo, lat, lon, timezone);
        });
    })
};
