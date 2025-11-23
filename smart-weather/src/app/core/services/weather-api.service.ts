import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, map, mergeMap, toArray } from 'rxjs';
import {
  WeatherApiResponse,
  WeatherData,
  Country,
  HistoricalWeatherData,
  HourlyForecastData,
} from '../interfaces/weather.interface';
import { GeocodingService } from './geocoding.service';
import { API_CONFIG } from '../../shared/constants/weather.constants';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private readonly http = inject(HttpClient);
  private readonly geocodingService = inject(GeocodingService);

  getWeatherData(lat: number, lon: number): Observable<WeatherApiResponse> {
    const url = `${API_CONFIG.WEATHER_BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;
    return this.http.get<WeatherApiResponse>(url);
  }

  getWeatherForCountry(country: Country): Observable<WeatherData | null> {
    return this.geocodingService.getCoordinates(country.capital).pipe(
      mergeMap((geoData) => {
        const location = this.geocodingService.extractLocation(geoData);
        if (!location) {
          return from([null]);
        }
        return this.getWeatherData(location.latitude, location.longitude).pipe(
          map((weatherData) => this.mapToWeatherData(weatherData, country)),
        );
      }),
    );
  }

  getWeatherForMultipleCountries(countries: Country[]): Observable<WeatherData[]> {
    return from(countries).pipe(
      mergeMap((country) => this.getWeatherForCountry(country)),
      toArray(),
      map((data) => data.filter((item): item is WeatherData => item !== null)),
    );
  }

  getHistoricalWeatherData(
    lat: number,
    lon: number,
    days: number = API_CONFIG.DEFAULT_HISTORICAL_DAYS,
  ): Observable<HistoricalWeatherData> {
    const url = `${API_CONFIG.WEATHER_BASE_URL}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&past_days=${days}`;
    return this.http.get<HistoricalWeatherData>(url);
  }

  getHourlyForecast(
    lat: number,
    lon: number,
    hours: number = API_CONFIG.DEFAULT_FORECAST_HOURS,
  ): Observable<HourlyForecastData> {
    const url = `${API_CONFIG.WEATHER_BASE_URL}?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code&timezone=auto&forecast_hours=${hours}`;
    return this.http.get<HourlyForecastData>(url);
  }

  private mapToWeatherData(
    weatherData: WeatherApiResponse,
    country: Country,
  ): WeatherData | null {
    if (!weatherData.current) {
      return null;
    }

    return {
      country: country.name,
      capital: country.capital,
      time: [weatherData.current.time],
      temperature_2m: [Math.round(weatherData.current.temperature_2m)],
      weather_code: [weatherData.current.weather_code],
    };
  }
}
