import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../../../../core/interfaces/weather.interface';
import { WeatherUtilsService } from '../../../../../core/services/weather-utils.service';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-card.html',
  styleUrls: ['./weather-card.scss'],
})
export class WeatherCard {
  weatherData = input.required<WeatherData>();
  animationDelay = input<number>(0);
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

  getTemperatureStyles(): { [key: string]: string } {
    const color = this.getTemperatureColor();
    return {
      background: `${color}20`,
      color: color,
      border: `1px solid ${color}40`,
    };
  }
}

