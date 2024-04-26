import clearDOMNodes from "../../utils/clearDOMNodes.js";

export default function InfoSunriseSunset(props) {
  let { className, sunrise, sunset, timezone } = props;
  const sectionDuration = document.querySelector(`.${className}`);
  clearDOMNodes(`.${className} .${'info-sunrise-sunset'}`);

  sunset = moment(sunset * 1000).zone(-(timezone / 60)).format('YYYY-MM-DD HH:mm');
  sunrise = moment(sunrise * 1000).zone(-(timezone / 60)).format('YYYY-MM-DD HH:mm');

  const hoursSunrise = new Date(sunrise).getHours() | 0;
  const minutesSunrise = new Date(sunrise).getMinutes() | 0;

  const hoursSunset = new Date(sunset).getHours() | 0;
  const minutesSunset = new Date(sunset ).getHours() | 0;

  const sectionElement = (`
      <ul class='info-sunrise-sunset'>
        <li class='info-sunrise-sunset__item'>
         <img src='./image/sun.svg' />
          <div class='info-sunrise-sunset__body-info'>
            <h4>Сонце</h4>
            <p class='weather-info'>${hoursSunrise + ':' + minutesSunrise} ранок</p>
       </div>
         </li>
           <li class='info-sunrise-sunset__item'>
            <img src='./image/moon.svg' />
           <div class='info-sunrise-sunset__body-info'>
             <h4>Місяць</h4>
               <p class='weather-info'>${hoursSunset + ':' + minutesSunset} вечора</p>
            </div>
         </li>
       </ul>
      `);

  sectionDuration.insertAdjacentHTML('beforeend', sectionElement);

};