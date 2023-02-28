import { CurrentWeatherModel } from "./currentWeatherModel";

export class WeatherModel{
    'latitude': number;
    'longitude': number;
    'generationtime_ms': string;
    'utc_offset_seconds': number;
    'timezone': string;
    'elevation': number;
    'current_weather': CurrentWeatherModel;
}