import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../../../../core/interfaces/weather.interface';
import { WeatherUtilsService } from '../../../../../core/services/weather-utils.service';

@Component({
  selector: 'app-weather-table-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-table-row.html',
  styleUrls: ['./weather-table-row.scss'],
})
export class WeatherTableRow {
  weatherData = input.required<WeatherData>();
  private readonly weatherUtils = inject(WeatherUtilsService);

  get temperature(): number {
    return this.weatherData().temperature_2m[0];
  }

  get weatherCode(): number {
    return this.weatherData().weather_code[0];
  }

  get time(): string {
    return this.weatherData().time[0];
  }

  getWeatherIcon(): string {
    return this.weatherUtils.getWeatherIcon(this.weatherCode);
  }

  getWeatherDescription(): string {
    return this.weatherUtils.getWeatherDescription(this.weatherCode);
  }

  getTemperatureColor(): string {
    return this.weatherUtils.getTemperatureColor(this.temperature);
  }
}

