import clearDOMNodes from "../../utils/clearDOMNodes.js";
import getWeatherIcon from "../../utils/getWeatherIcon.js";
import { calcKelvin } from "../../utils/calcTemp.js";
import addArrayHTML from "../../utils/addArrayHTML.js";

export default function WeatherToday(props) {
    let { className, date, listData, lat, lon, timezone } = props; 
    const sectionTimeWather = document.querySelector(`.${className}`);
    clearDOMNodes(`.${className} .weather-today`);

    const infoToday = [];

    const listInfoToday = [];

    const list = (`<ul class='weather-today ${className + '__' + 'weather-today'}'></ul>`);

    sectionTimeWather.insertAdjacentHTML('beforeend', list);

    const parentList = document.querySelector(`.${className} .weather-today`);

    for (let i = 0; i < listData.length; i++) {
        const allDate = new Date(listData[i].dt_txt).getDate();
        if (allDate === date) {
            listInfoToday.push(listData[i]);
        }
    }

    for (let i = 0; i < listInfoToday.length; i++) {
        const hours = new Date(listInfoToday[i].dt_txt).getHours();
        const image = listInfoToday[i].weather[0].description;;
        infoToday.push(
            `<li class='weather-today__item section-block'>
             <p class='weather-today__oclock text-info'>${hours} Год</p>
             <img class='weather-today__img weather-img' src=${getWeatherIcon(listInfoToday[i].dt_txt, lat, lon, timezone, image)} >
             <p class='weather-today__celsius text-info'>${calcKelvin(listInfoToday[i].main.temp)}</p>
          </li>`
        );
    }

    addArrayHTML(infoToday, parentList);

};
