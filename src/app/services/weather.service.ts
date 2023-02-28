import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { faCloud, faCloudBolt, faCloudRain, faCloudSun, faSnowflake, faSun, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { WeatherModel } from '../models/weatherModel';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http : HttpClient) { }

  /**
   * Method to get the weather from the API.
   * @returns WeatherModel with temperature and weathercode.
   * @see https://open-meteo.com/en/api/forecast
   */
  getWeather() : Observable<WeatherModel>{
    return this.http.get<WeatherModel>('https://api.open-meteo.com/v1/forecast?latitude=45.52&longitude=4.54&current_weather=true');
  }

  /**
   * Method to get the weather icon from the weathercode.
   * @param weathercode Weathercode from the API.
   * @returns IconDefinition from the weathercode.
   * @see https://open-meteo.com/en/api/forecast
   * @see https://fontawesome.com/icons?d=gallery&s=solid&m=free
   * @see https://fontawesome.com/how-to-use/on-the-web/using-with/angular
   **/
  getWeatherIcon(weathercode: number) : IconDefinition{

    if(weathercode >= 0 && weathercode <= 1) {
      return faSun;
    }else if(weathercode >= 2 && weathercode <= 3){
      return faCloudSun;
    }else if(weathercode >= 45 && weathercode <= 57){
      return faCloud;
    }else if(weathercode >= 61 && weathercode <= 67){
      return faCloudRain;
    }else if(weathercode >= 71 && weathercode <= 86){
      return faSnowflake;
    }else if(weathercode >= 90 && weathercode <= 99){
      return faCloudBolt;
    }

    return faSun;
  }
}
