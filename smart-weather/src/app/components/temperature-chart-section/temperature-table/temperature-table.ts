import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherApiService } from '../../../core/services/weather-api.service';
import { WeatherUtilsService } from '../../../core/services/weather-utils.service';
import { PaginationService } from '../../../core/services/pagination.service';
import { WeatherTableStateService } from '../../../core/state/weather-table-state.service';
import { COUNTRIES, WEATHER_CONFIG } from '../../../shared/constants/weather.constants';
import {
  Country,
  WeatherData,
  SortColumn,
  SortDirection,
} from '../../../core/interfaces/weather.interface';
import { TableControls } from './components/table-controls/table-controls';
import { WeatherTableRow } from './components/weather-table-row/weather-table-row';
import { WeatherCard } from './components/weather-card/weather-card';
import { LoadingState } from '../../../shared/components/loading-state/loading-state';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { Pagination } from '../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-temperature-table',
  standalone: true,
  imports: [
    CommonModule,
    TableControls,
    WeatherTableRow,
    WeatherCard,
    LoadingState,
    EmptyState,
    Pagination,
  ],
  templateUrl: './temperature-table.html',
  styleUrls: ['./temperature-table.scss'],
})
export class TemperatureTable implements OnInit {
  private readonly weatherApi = inject(WeatherApiService);
  private readonly weatherUtils = inject(WeatherUtilsService);
  private readonly pagination = inject(PaginationService);
  public readonly tableState = inject(WeatherTableStateService);

  public readonly supportedCountries: Country[] = COUNTRIES;
  public readonly config = WEATHER_CONFIG;

  public readonly isLoading = this.tableState.isLoading;
  public readonly searchTerm = this.tableState.searchQuery;
  public readonly sortColumn = this.tableState.activeSortColumn;
  public readonly sortDirection = this.tableState.activeSortDirection;
  public readonly currentPage = this.tableState.currentPage;

  public readonly filteredData = computed(() => {
    const searchTerm = this.tableState.searchQuery();
    const weatherData = this.tableState.weatherData();
    return this.weatherUtils.filterWeatherData(weatherData, searchTerm);
  });

  public readonly sortedData = computed(() => {
    const data = this.filteredData();
    const column = this.tableState.activeSortColumn();
    const direction = this.tableState.activeSortDirection();
    return this.sortWeatherData(data, column, direction);
  });

  public readonly paginatedData = computed(() =>
    this.pagination.getPaginatedData(
      this.sortedData(),
      this.tableState.currentPage(),
      this.config.itemsPerPage,
    ),
  );

  public readonly totalPages = computed(() =>
    this.pagination.getTotalPages(this.filteredData().length, this.config.itemsPerPage),
  );

  public readonly visiblePageNumbers = computed(() =>
    this.pagination.getVisiblePageNumbers(this.tableState.currentPage(), this.totalPages()),
  );

  public readonly shouldShowPagination = computed(
    () => this.totalPages() > 1 && !this.tableState.isLoading() && this.filteredData().length > 0,
  );

  public readonly shouldShowEmptyState = computed(
    () => this.filteredData().length === 0 && !this.tableState.isLoading(),
  );

  public readonly canNavigateToNextPage = computed(
    () => this.tableState.currentPage() < this.totalPages(),
  );

  public readonly canNavigateToPreviousPage = computed(() => this.tableState.currentPage() > 1);

  public ngOnInit(): void {
    this.loadInitialWeatherData();
  }

  public trackByCountry(_index: number, item: WeatherData): string {
    return `${item.country}-${item.capital}`;
  }

  private loadInitialWeatherData(): void {
    this.tableState.setLoading(true);

    this.weatherApi.getWeatherForMultipleCountries(this.supportedCountries).subscribe({
      next: (weatherData: WeatherData[]) => {
        this.tableState.setWeatherData(weatherData);
        this.tableState.setLoading(false);
      },
      error: (error: Error) => {
        console.error('Failed to load weather data:', error);
        this.tableState.setLoading(false);
      },
    });
  }

  public refreshWeatherData(): void {
    this.tableState.resetState(this.config);
    this.loadInitialWeatherData();
  }

  private sortWeatherData(
    data: WeatherData[],
    column: SortColumn,
    direction: SortDirection,
  ): WeatherData[] {
    if (!data.length) return [];

    return [...data].sort((a, b) => {
      const aValue = this.getSortValue(a, column);
      const bValue = this.getSortValue(b, column);

      if (aValue === bValue) return 0;

      const comparison =
        typeof aValue === 'number' && typeof bValue === 'number'
          ? aValue - bValue
          : String(aValue).localeCompare(String(bValue));

      return direction === 'asc' ? comparison : -comparison;
    });
  }

  private getSortValue(item: WeatherData, column: SortColumn): string | number {
    return column === 'temperature' ? item.temperature_2m[0] : item.country.toLowerCase();
  }
}
