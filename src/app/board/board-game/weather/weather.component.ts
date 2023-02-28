import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { WeatherModel } from 'src/app/models/weatherModel';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  public weatherModel: WeatherModel | undefined;
  public weatherIcon: IconDefinition | undefined;

  constructor(private wheatherService: WeatherService) { }

  ngOnInit(): void {

    /* Get current weather */
    this.wheatherService.getWeather().subscribe({
      next: (data) => this.weatherModel = data,
      error: (error) => console.log(error),
      complete: () => {

        if (this.weatherModel) {

          /* Round temperature */
          this.weatherModel.current_weather.temperature = Number(this.weatherModel.current_weather.temperature.toFixed());


          /* Get weather icon */
          this.weatherIcon = this.wheatherService.getWeatherIcon(this.weatherModel.current_weather.weathercode);
        }
      }
    });

  }
}
