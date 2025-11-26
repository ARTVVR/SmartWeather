import {
  Component,
  inject,
  OnInit,
  ViewChild,
  ElementRef,
  DestroyRef,
  OnDestroy,
  AfterViewChecked,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WeatherApiService } from '../../../core/services/weather-api.service';
import { CHART_CONFIG, COUNTRIES } from '../../../shared/constants/weather.constants';
import { Pie } from '@antv/g2plot';
import { CommonModule } from '@angular/common';
import { LoadingState } from '../../../shared/components/loading-state/loading-state';
import { forkJoin } from 'rxjs';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ChartDataItem, WeatherDataUniversal } from '../../../core/interfaces/weather.interface';

@Component({
  selector: 'app-wind-chart',
  standalone: true,
  imports: [CommonModule, LoadingState, NzPaginationModule],
  templateUrl: './wind-chart.html',
  styleUrl: './wind-chart.scss',
})
export class WindChart implements OnInit, OnDestroy, AfterViewChecked {
  private weatherService = inject(WeatherApiService);
  private destroyRef = inject(DestroyRef);

  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

  isLoading = true;
  private chart: Pie | null = null;

  chartData: ChartDataItem[] = [];
  currentDate = '';
  currentPage = 1;
  pageSize = CHART_CONFIG.PAGE_SIZE;
  countryColors = new Map<string, string>();

  ngOnInit() {
    this.setCurrentDate();
    this.loadAllCountriesData();
  }

  get displayedCountries() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.chartData.slice(start, start + this.pageSize);
  }

  getCountryColor(country: string): string {
    return this.countryColors.get(country) || CHART_CONFIG.COLORS[0];
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  trackByCountry(_: number, item: ChartDataItem): string {
    return item.country;
  }

  refreshData() {
    this.currentPage = 1;
    this.isLoading = true;
    this.setCurrentDate();
    this.destroyChart();
    this.loadAllCountriesData();
  }

  private setCurrentDate() {
    this.currentDate = new Date().toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  private getWindDirection(deg: number): string {
    const match = CHART_CONFIG.WIND_DIRECTIONS.find((dir) =>
      dir.min > dir.max ? deg >= dir.min || deg < dir.max : deg >= dir.min && deg < dir.max,
    );
    return match?.direction || '—';
  }

  private calculateAverageWindData(speeds: number[], directions: number[]) {
    const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length;
    const avgDirection = directions.reduce((a, b) => a + b, 0) / directions.length;

    return {
      speed: Math.round((avgSpeed / 3.6) * 10) / 10,
      direction: Math.round(avgDirection),
    };
  }

  private createCountryData(data: WeatherDataUniversal, index: number): ChartDataItem {
    const countryName = COUNTRIES[index].name;
    const color = CHART_CONFIG.COLORS[index % CHART_CONFIG.COLORS.length];

    const wind = this.calculateAverageWindData(
      data.hourly.wind_speed_10m,
      data.hourly.wind_direction_10m,
    );

    this.countryColors.set(countryName, color);

    return {
      country: countryName,
      value: wind.speed,
      direction: this.getWindDirection(wind.direction),
      degrees: wind.direction,
      color,
    };
  }

  loadAllCountriesData() {
    const requests = COUNTRIES.map((c) =>
      this.weatherService.getWeatherDataUniversal(
        c.lat!,
        c.lon!,
        'hourly=wind_speed_10m,wind_direction_10m',
        1,
      ),
    );

    forkJoin(requests)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (results) => {
          this.chartData = results.map((d, i) => this.createCountryData(d, i));
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  ngAfterViewChecked() {
    if (!this.isLoading && this.chartData.length && !this.chart) {
      this.createChart(this.chartData);
    }
  }

  private createChart(data: ChartDataItem[]) {
    if (!this.chartContainer?.nativeElement) return;

    this.destroyChart();

    const container = this.chartContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (!width || !height) return;

    const isSmall = width < 650;

    this.chart = new Pie(container, {
      data,
      angleField: 'value',
      colorField: 'country',
      color: CHART_CONFIG.COLORS,
      radius: isSmall ? 1 : 0.8,
      innerRadius: isSmall ? 0.1 : 0,
      padding: isSmall ? 5 : [30, 30, 30, 30],
      label: isSmall
        ? {
            type: 'inner',
            offset: '-30%',
            content: (datum) => {
              const d = datum as ChartDataItem;
              return `${d.country}\n${d.value} м/с`;
            },
            style: { fill: '#fff', fontSize: 10, fontWeight: 600 },
          }
        : {
            type: 'outer',
            content: (datum) => {
              const d = datum as ChartDataItem;
              return `${d.country}: ${d.value} м/с`;
            },
            style: { fill: '#1e293b', fontSize: 12, fontWeight: 500 },
          },
      legend: false,
      tooltip: {
        showTitle: false,
        formatter: (datum) => {
          const d = datum as ChartDataItem;
          return { name: d.country, value: `${d.value} м/с (${d.direction})` };
        },
      },
      interactions: [{ type: 'element-active' }],
      statistic: { title: false, content: false },
      autoFit: true,
    });

    this.chart.render();
  }

  private destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  ngOnDestroy() {
    this.destroyChart();
  }
}
