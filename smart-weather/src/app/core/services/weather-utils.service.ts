import { Injectable } from '@angular/core';
import {
  WEATHER_ICONS,
  WEATHER_DESCRIPTIONS,
  TEMPERATURE_COLORS,
  TEMPERATURE_RANGES,
} from '../../shared/constants/weather.constants';
import { WeatherData } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherUtilsService {
  getWeatherIcon(code: number): string {
    return WEATHER_ICONS[code] || '❓';
  }

  getWeatherDescription(code: number): string {
    return WEATHER_DESCRIPTIONS[code] || 'Неизвестно';
  }

  getTemperatureColor(temp: number): string {
    if (temp >= TEMPERATURE_RANGES.EXTREME_HEAT) return TEMPERATURE_COLORS.hot;
    if (temp >= TEMPERATURE_RANGES.HOT) return TEMPERATURE_COLORS.warm;
    if (temp >= TEMPERATURE_RANGES.WARM) return TEMPERATURE_COLORS.mild;
    if (temp >= TEMPERATURE_RANGES.MILD) return TEMPERATURE_COLORS.cool;
    if (temp >= TEMPERATURE_RANGES.COOL) return TEMPERATURE_COLORS.cold;
    if (temp >= TEMPERATURE_RANGES.COLD) return TEMPERATURE_COLORS.chilly;
    if (temp >= TEMPERATURE_RANGES.CHILLY) return TEMPERATURE_COLORS.freezing;
    if (temp >= TEMPERATURE_RANGES.FREEZING) return TEMPERATURE_COLORS.veryCold;
    if (temp >= TEMPERATURE_RANGES.VERY_COLD) return TEMPERATURE_COLORS.extremeCold;
    return TEMPERATURE_COLORS.arctic;
  }

  filterWeatherData(data: WeatherData[], searchTerm: string): WeatherData[] {
    if (!searchTerm.trim()) {
      return data;
    }

    const searchLower = searchTerm.toLowerCase();
    return data.filter(
      (item) =>
        item.country.toLowerCase().includes(searchLower) ||
        item.capital.toLowerCase().includes(searchLower) ||
        this.getWeatherDescription(item.weather_code[0]).toLowerCase().includes(searchLower),
    );
  }
}
