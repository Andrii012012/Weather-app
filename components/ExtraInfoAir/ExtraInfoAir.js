import clearDOMNodes from "../../utils/clearDOMNodes.js";

export default function ExtraInfoAir(props) {
    let { className, speed, deg, gust } = props;
    const sectionAirQuality = document.querySelector(`.${className}`);
    clearDOMNodes(`.${className} .${'extra-info-air'}`);

    const sectionElement = (`
           <div class='extra-info-air'>
              <img class='extra-info-air__image' src='./image/wind.png'/>
              <ul class='extra-info-air__list'>
               <li class='extra-info-air__item'>
                   <h4>Скорость</h4>
                   <p class='weather-info'>${speed} <span class='extra-explain'>м/c</span></p></li>
                 </li>
                 <li class='extra-info-air__item'>
                   <h4>Град</h4>
                   <p class='weather-info'>${deg} <span class='extra-explain'>град</span></p></li>
                 </li>
                ${gust ? `<li class='extra-info-air__item'>
                <h4>Пориви</h4>
               <p class='weather-info'>${gust} <span class='extra-explain'>м/ч</span></p></li>
             </li>` : ''}
              </ul>
           </div>
        `);

    sectionAirQuality.insertAdjacentHTML('beforeend', sectionElement);

};