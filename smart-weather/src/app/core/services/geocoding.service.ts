import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeoApiResponse, GeoLocation } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://geocoding-api.open-meteo.com/v1/search';

  getCoordinates(capital: string): Observable<GeoApiResponse> {
    return this.http.get<GeoApiResponse>(
      `${this.baseUrl}?name=${encodeURIComponent(capital)}&count=1&language=ru`,
    );
  }

  extractLocation(geoData: GeoApiResponse): GeoLocation | null {
    return geoData.results?.[0] || null;
  }
}
