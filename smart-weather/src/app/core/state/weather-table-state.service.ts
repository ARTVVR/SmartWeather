import { Injectable, signal } from '@angular/core';
import {
  WeatherData,
  SortColumn,
  SortDirection,
  WeatherConfig,
} from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherTableStateService {
  private readonly _weatherData = signal<WeatherData[]>([]);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _searchQuery = signal<string>('');
  private readonly _activeSortColumn = signal<SortColumn>('temperature');
  private readonly _activeSortDirection = signal<SortDirection>('desc');
  private readonly _currentPage = signal<number>(1);

  public readonly weatherData = this._weatherData.asReadonly();
  public readonly isLoading = this._isLoading.asReadonly();
  public readonly searchQuery = this._searchQuery.asReadonly();
  public readonly activeSortColumn = this._activeSortColumn.asReadonly();
  public readonly activeSortDirection = this._activeSortDirection.asReadonly();
  public readonly currentPage = this._currentPage.asReadonly();

  setWeatherData(data: WeatherData[]): void {
    this._weatherData.set(data);
  }

  setLoading(loading: boolean): void {
    this._isLoading.set(loading);
  }

  updateSearchQuery(query: string): void {
    this._searchQuery.set(query);
    this._currentPage.set(1);
  }

  updateSort(column: SortColumn): void {
    if (this._activeSortColumn() === column) {
      this._activeSortDirection.update((dir) => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      this._activeSortColumn.set(column);
      this._activeSortDirection.set('desc');
    }
  }

  setCurrentPage(page: number): void {
    this._currentPage.set(page);
  }

  navigateToNextPage(): void {
    this._currentPage.update((page) => page + 1);
  }

  navigateToPreviousPage(): void {
    this._currentPage.update((page) => page - 1);
  }

  resetState(config: WeatherConfig): void {
    this._weatherData.set([]);
    this._searchQuery.set('');
    this._currentPage.set(1);
    this._activeSortColumn.set(config.defaultSort.column);
    this._activeSortDirection.set(config.defaultSort.direction);
  }
}
