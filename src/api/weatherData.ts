import Constants from "expo-constants";
import { type IWeather } from "../interfaces/IWeather";
import { type ICity } from "../interfaces/ICity";

const WEATHER_API = {
  currentWeather: "https://api.openweathermap.org/data/2.5/weather?",
  directGeocoding: "https://api.openweathermap.org/geo/1.0/direct?q=",
};

const key: string = Constants.expoConfig?.extra?.openWeatherKey ?? "";

export async function getWeatherData(city: string): Promise<IWeather> {
  try {
    const { lat, lon, name } = await getGeocoding(city);
    const queryParams = `lat=${lat}&lon=${lon}`;
    const response = await fetchOpenWeather(
      WEATHER_API.currentWeather + queryParams
    );
    const json = await response.json();
    const temperature = json.main.temp;
    const description = json.weather[0].description;
    return { temperature, description, name };
  } catch (e) {
    throw new Error(`Failed to get weather data for ${city}`);
  }
}

export async function getGeocoding(city: string): Promise<ICity> {
  try {
    const response = await fetchOpenWeather(WEATHER_API.directGeocoding + city);
    const json = await response.json();
    const { lon, lat, name } = json[0];
    return { lon, lat, name };
  } catch (e) {
    throw new Error(`Failed to get geocoding data for ${city}`);
  }
}

function fetchOpenWeather(data: string): any {
  return fetch(`${data}&appid=${key}&units=metric`);
}
