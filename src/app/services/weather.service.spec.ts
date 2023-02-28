import { TestBed } from '@angular/core/testing';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { AppModule } from '../app.module';

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return current wheather', () => {
    expect(service.getWeather()).toBeTruthy();
    expect(service.getWeather()).not.toBeNull();
  });

  it('should return weather icon', () => {
    expect(service.getWeatherIcon(0)).toBeTruthy();
    expect(service.getWeatherIcon(0)).not.toBeNull();
  });
});
