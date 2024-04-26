
import { STATE_WEATHER_DAY, STATE_WEATHER_NIGHT } from "../constants/weatherIcons.js";

export default function getWeatherIcon(date, lat, lon, timezone, weather) {
    let dateHours = new Date(date).getHours();

    let sunset = new Date(SunCalc.getSunTimes(new Date(), lat, lon).sunsetStart.value);
    let sunrise = new Date(SunCalc.getSunTimes(new Date(), lat, lon).sunriseStart.value);

    sunset = moment(sunset).zone(-(timezone / 60)).format('YYYY-MM-DD HH:mm');
    sunrise = moment(sunrise).zone(-(timezone / 60)).format('YYYY-MM-DD HH:mm');

    sunset = new Date(sunset).getHours();
    sunrise = new Date(sunrise).getHours();

    if (dateHours >= sunset || dateHours <= sunrise) {
        return STATE_WEATHER_NIGHT.get(weather);
    } else {
        return STATE_WEATHER_DAY.get(weather);
    };
}