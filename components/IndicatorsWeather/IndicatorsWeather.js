import clearDOMNodes from "../../utils/clearDOMNodes.js";
import { calcKelvin } from "../../utils/calcTemp.js";
import addArrayHTML from "../../utils/addArrayHTML.js";

export default function IndicatorsWeather(props) {
    let { className, listIndicatorsWeather } = props;
    const sectionDifferentList = document.querySelector(`.${className}`);
    clearDOMNodes(`.${className} .indicator-weather`);

    const list = (`<ul class='indicator-weather ${className + '__' + 'indicator-weather'}'></ul>`);

    sectionDifferentList.insertAdjacentHTML('beforeend', list);

    const listCharacteristics = document.querySelector(`.${className + '__' + 'indicator-weather'}`);

    const sectionElement = [];

    for (let i = 0; i < listIndicatorsWeather.length; i++) {
        if (listIndicatorsWeather[i].symbol !== 'celsius' && listIndicatorsWeather[i].text) {
            sectionElement.push(
                `
                    <li class='indicator-weather__item section-block'>
                      <div class='indicator-weather__body-info'>
                       <h4 class='text-info' >${listIndicatorsWeather[i].title}</h4>
                       <img class='indicator-weather__image' src=${listIndicatorsWeather[i].img} />
                      </div>
                       <p class='weather-info'>${listIndicatorsWeather[i].text} <span class='extra-explain'>${listIndicatorsWeather[i].symbol}</span></p>
                    </li>
                    `
            );
        } else if (listIndicatorsWeather[i].symbol === 'celsius' && listIndicatorsWeather[i].text) {
            sectionElement.push(
                `
                    <li class='indicator-weather__item section-block'>
                      <div class='indicator-weather__body-info'>
                       <h4>${listIndicatorsWeather[i].title}</h4>
                       <img class='indicator-weather__image' src=${listIndicatorsWeather[i].img} />
                      </div>
                       <p class='indicator-weather__info weather-info'>${calcKelvin(listIndicatorsWeather[i].text)}<span></span></p>
                    </li>
                    `
            );
        }
    }

    addArrayHTML(sectionElement, listCharacteristics);

};