
//this api for get weather through name
const API_WEATHER_NAME_NOW = `http://api.openweathermap.org/geo/1.0/direct?q=`;
const API_WEATHER_NAME_AFTER = `http://api.openweathermap.org/geo/1.0/direct?q=`;

//this api for get weather through lon
const API_WEATHER_LON_NOW = `https://api.openweathermap.org/data/2.5/weather?lat=`;
const API_WEATHER_LON_AFTER = `https://api.openweathermap.org/data/2.5/forecast?lat=`;

//The keys for getting data weather
const KEY_NOW = '78edaac4855efb4bef0d870b50775de1';
const KEY_AFTER = '5e9ba88a5485472335ce57d66fd702c7';

 
export {
    API_WEATHER_NAME_NOW,
    API_WEATHER_NAME_AFTER,
    API_WEATHER_LON_NOW,
    API_WEATHER_LON_AFTER,
    KEY_NOW,
    KEY_AFTER
}