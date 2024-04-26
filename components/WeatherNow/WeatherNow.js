import { calcKelvin } from "../../utils/calcTemp.js";
import getWeatherIcon from "../../utils/getWeatherIcon.js";
import clearDOMNodes from "../../utils/clearDOMNodes.js";

export default function WeatherNow(props) {
    let { temp, name, stateWeather, country, lat, lon, timezone } = props;
    const sectionNow = document.querySelector('.weather-now');
    clearDOMNodes('.weather-now__info');

    const сelsius = calcKelvin(temp);

    const options = {
        day: 'numeric',
        weekday: 'long',
        month: 'long',
    }

    const today = new Date().toLocaleString(country, options);

    const sectionElement = (`
          <div class="weather-now__info">
             <div class='weather-now__body'>
               <div class='weather-now__celsius'>${сelsius}<span>C</span></div>
               <img class='weather-now__image' src=${getWeatherIcon(new Date(), lat, lon, timezone, stateWeather)} /> 
             </div>
             <h4 class='weather-now__state'>${name}</h4>
             <p class='weather-now__date text-info'>${today}</p>
             <p class='weather-now__location text-info'>${country}</p>
          </div>
       `);

    sectionNow.insertAdjacentHTML('beforeend', sectionElement);

};