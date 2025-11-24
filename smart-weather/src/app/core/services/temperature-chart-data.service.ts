import { Injectable, inject } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import {
  GeoLocation,
  HistoricalWeatherData,
  HourlyForecastData,
  TemperatureChartPoint,
  TemperaturePeriod,
} from '../interfaces/weather.interface';
import { GeocodingService } from './geocoding.service';
import { WeatherApiService } from './weather-api.service';

@Injectable({
  providedIn: 'root',
})
export class TemperatureChartDataService {
  private readonly geocodingService = inject(GeocodingService);
  private readonly weatherApi = inject(WeatherApiService);

  private readonly locationCache = new Map<string, GeoLocation>();

  getTemperatureSeries(
    city: string,
    period: TemperaturePeriod,
  ): Observable<TemperatureChartPoint[]> {
    return this.getLocation(city).pipe(switchMap((location) => this.fetchSeries(location, period)));
  }

  private getLocation(city: string): Observable<GeoLocation> {
    const cacheKey = city.toLowerCase();
    const cachedLocation = this.locationCache.get(cacheKey);

    if (cachedLocation) {
      return of(cachedLocation);
    }

    return this.geocodingService.getCoordinates(city).pipe(
      map((geoData) => {
        const location = this.geocodingService.extractLocation(geoData);
        if (!location) {
          throw new Error(`Не удалось определить координаты для города ${city}`);
        }

        this.locationCache.set(cacheKey, location);
        return location;
      }),
    );
  }

  private fetchSeries(
    location: GeoLocation,
    period: TemperaturePeriod,
  ): Observable<TemperatureChartPoint[]> {
    const { latitude, longitude } = location;

    switch (period) {
      case 'day':
        return this.weatherApi
          .getHourlyForecast(latitude, longitude, 24)
          .pipe(map((data) => this.mapHourlyData(data, period)));

      case 'week':
        return this.weatherApi
          .getDailyForecast(latitude, longitude, 7)
          .pipe(map((data) => this.mapDailyData(data, period)));

      case 'month':
        return this.weatherApi
          .getDailyForecast(latitude, longitude, 16) // Максимум 16 дней
          .pipe(map((data) => this.mapDailyData(data, period)));

      default:
        return of([]);
    }
  }

  private mapHourlyData(
    data: HourlyForecastData,
    period: TemperaturePeriod,
  ): TemperatureChartPoint[] {
    if (!data.hourly?.time?.length) {
      return [];
    }

    return data.hourly.time.map((time, index) => ({
      timestamp: time,
      label: this.formatLabel(time, period),
      temperature: Math.round(data.hourly.temperature_2m[index]),
    }));
  }

  private mapDailyData(
    data: HistoricalWeatherData,
    period: TemperaturePeriod,
  ): TemperatureChartPoint[] {
    if (!data.daily?.time?.length) {
      return [];
    }

    return data.daily.time.map((time, index) => {
      const max = data.daily.temperature_2m_max[index];
      const min = data.daily.temperature_2m_min[index];
      const avg = (max + min) / 2;

      return {
        timestamp: time,
        label: this.formatLabel(time, period),
        temperature: Math.round(avg),
      };
    });
  }

  private formatLabel(dateString: string, period: TemperaturePeriod): string {
    const date = new Date(dateString);

    switch (period) {
      case 'day':
        return new Intl.DateTimeFormat('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        }).format(date);

      case 'week':
        return new Intl.DateTimeFormat('ru-RU', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }).format(date);

      case 'month':
        return new Intl.DateTimeFormat('ru-RU', {
          day: 'numeric',
          month: 'short',
        }).format(date);

      default:
        return new Intl.DateTimeFormat('ru-RU', {
          day: '2-digit',
          month: 'short',
        }).format(date);
    }
  }
}
