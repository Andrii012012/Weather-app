"use strict";
import {
  API_WEATHER_LON_NOW,
  API_WEATHER_LON_AFTER,
  KEY_NOW,
  KEY_AFTER
} from './config/url.js';
import { getDataInLon } from "./servers/callServer.js";
import WeatherNow from "./components/WeatherNow/WeatherNow.js";
import ExtraInfoAir from "./components/ExtraInfoAir/ExtraInfoAir.js";
import InfoSunriseSunset from "./components/InfoSunriseSunset/InfoSunriseSunset.js";
import IndicatorsWeather from "./components/IndicatorsWeather/IndicatorsWeather.js";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast.js";
import WeatherToday from "./components/WeatherToday/WeatherToday.js";

alert(`The app can't work well because the call to the server doesn't protected. You need to turn off an option in google to the app work corrently`);

export default async function initialApp(weatherNow = getDataInLon('51.5072', '0.1276', API_WEATHER_LON_NOW, KEY_NOW),
  weatherAfter = getDataInLon('51.5072', '0.1276', API_WEATHER_LON_AFTER, KEY_AFTER)) {

  let data = await weatherNow;
  let dataAfter = await weatherAfter;

  WeatherNow({ temp: data.main.temp, name: data.name, stateWeather: data.weather[0].description, country: data.sys.country, lat: data.coord.lat, lon: data.coord.lon, timezone: data.timezone});

  ExtraInfoAir({className: 'weather-air-quality', speed: data.wind.speed, deg: data.wind.deg});

  InfoSunriseSunset({ className: 'weather-duration', sunrise: data.sys.sunrise, sunset: data.sys.sunset, timezone: data.timezone });

  IndicatorsWeather({className: 'weather-different__list', listIndicatorsWeather: [
      {
        img: './image/humidity.svg',
        title: 'вологість',
        symbol: '%',
        text: data.main.humidity,
      },
      {
        img: './image/pressure.svg',
        title: 'тиск',
        symbol: 'Пск',
        text: data.main.pressure,
      },
      {
        img: './image/thermometer.svg',
        title: 'відчуваться, як',
        symbol: 'celsius',
        text: data.main.feels_like,
      },
      {
        img: './image/visibility.svg',
        title: 'видимість',
        symbol: 'Км',
        text: (data.visibility / 1000),
      },
    ]});

    WeatherForecast({list: dataAfter.list, lat: data.coord.lat, lon: data.coord.lon, timezone: data.timezone});

    WeatherToday({className: 'time-weather', listData: dataAfter.list, date: new Date().getDate(), lat: data.coord.lat, lon: data.coord.lon, timezone: data.timezone});

}

initialApp();