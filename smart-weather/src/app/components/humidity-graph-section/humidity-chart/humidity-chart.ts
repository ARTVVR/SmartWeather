import { Component, inject, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { WeatherApiService } from '../../../core/services/weather-api.service';
import { Column } from '@antv/g2plot';
import { LoadingState } from '../../../shared/components/loading-state/loading-state';
import { COUNTRIES } from '../../../shared/constants/weather.constants';
import { Country } from '../../../core/interfaces/weather.interface';

interface DailyData {
  time: string[];
  relative_humidity_2m_mean: number[];
}

@Component({
  selector: 'app-humidity-chart',
  standalone: true,
  imports: [LoadingState],
  templateUrl: './humidity-chart.html',
  styleUrl: './humidity-chart.scss',
})
export class HumidityChart implements OnInit, OnDestroy {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private weatherService = inject(WeatherApiService);

  public readonly supportedCountries: Country[] = COUNTRIES;

  private dataHumidity: DailyData | null = null;
  private chart: Column | null = null;

  isLoading = true;

  ngOnInit() {
    this.getHumidityData();
  }
  getHumidityData() {
    const belarus = this.supportedCountries.find((country) => country.name === 'Беларусь');

    this.weatherService
      .getWeatherDataUniversal(belarus!.lat, belarus!.lon, 'daily=relative_humidity_2m_mean', 7)
      .subscribe({
        next: (data) => {
          this.dataHumidity = data.daily;
          this.isLoading = false;
          this.renderChart();
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
  }

  private renderChart() {
    if (!this.dataHumidity) return;

    const chartData = this.dataHumidity.time.map((date, index) => ({
      date: new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        weekday: 'short',
        month: 'short',
      }),
      humidity: this.dataHumidity!.relative_humidity_2m_mean[index],
    }));

    this.chart = new Column(this.chartContainer.nativeElement, {
      data: chartData,
      xField: 'date',
      yField: 'humidity',
      autoFit: true,
      padding: [40, 20, 50, 60],
      color: '#3b82f6',
      columnStyle: {
        radius: [4, 4, 0, 0],
      },
      meta: {
        date: {
          alias: 'Дата',
        },
        humidity: {
          alias: 'Влажность',
          formatter: (value: number) => `${value}%`,
        },
      },
      label: {
        position: 'top',
        style: {
          fill: '#1e40af',
          fontSize: 12,
          fontWeight: 'bold',
        },
      },
      xAxis: {
        title: {
          text: 'Период',
          style: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        },
        label: {
          style: {
            fill: '#4b5563',
            fontSize: 11,
          },
        },
        line: {
          style: {
            stroke: '#d1d5db',
          },
        },
      },
      yAxis: {
        title: {
          text: 'Влажность %', // Подпись слева (вертикально)
          style: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        },
        label: {
          style: {
            fill: '#4b5563',
            fontSize: 11,
          },
        },
        grid: {
          line: {
            style: {
              stroke: '#e5e7eb',
              lineDash: [4, 4],
            },
          },
        },
      },
      tooltip: {
        showTitle: true,
        title: 'Влажность',
        domStyles: {
          'g2-tooltip': {
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            border: '1px solid #dbeafe',
          },
          'g2-tooltip-title': {
            color: '#1e40af',
            fontWeight: 'bold',
          },
          'g2-tooltip-list-item': {
            color: '#374151',
          },
        },
      },
      interactions: [
        {
          type: 'element-active',
          cfg: {
            style: {
              fill: '#2563eb',
            },
          },
        },
      ],
      animation: {
        appear: {
          animation: 'scale-in-y',
          duration: 500,
        },
      },
    });

    this.chart.render();
  }

  refreshData() {
    this.isLoading = true;

    this.clearChart();
    this.getHumidityData();
  }

  private clearChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    this.dataHumidity = null;
  }

  ngOnDestroy() {
    this.clearChart();
  }
}
