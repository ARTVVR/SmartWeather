import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Line } from '@antv/g2plot';
import { TemperatureChartDataService } from '../../../../../core/services/temperature-chart-data.service';
import {
  TemperatureChartPoint,
  TemperaturePeriod,
} from '../../../../../core/interfaces/weather.interface';
import { Subscription } from 'rxjs';
import { LoadingState } from '../../../../../shared/components/loading-state/loading-state';

@Component({
  selector: 'app-temperature-chart',
  standalone: true,
  imports: [CommonModule, LoadingState],
  templateUrl: './temperature-chart.html',
  styleUrl: './temperature-chart.scss',
})
export class TemperatureChart implements AfterViewInit, OnChanges, OnDestroy {
  @Input() period: TemperaturePeriod = 'week';
  @Input() city = 'Минск';

  @ViewChild('chartContainer', { static: true })
  private chartContainer?: ElementRef<HTMLDivElement>;

  private readonly chartDataService = inject(TemperatureChartDataService);
  private chart?: Line;
  private dataSubscription?: Subscription;
  private viewInitialized = false;

  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);

  ngAfterViewInit(): void {
    this.initializeChart();
    this.viewInitialized = true;
    this.loadChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const periodChanged = changes['period'] && !changes['period'].firstChange;
    const cityChanged = changes['city'] && !changes['city'].firstChange;

    if ((periodChanged || cityChanged) && this.viewInitialized) {
      this.loadChartData();
    }
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
    this.chart?.destroy();
  }

  private initializeChart(): void {
    if (!this.chartContainer) {
      return;
    }

    this.chart = new Line(this.chartContainer.nativeElement, {
      data: [],
      xField: 'label',
      yField: 'temperature',
      height: 320,
      autoFit: true,
      smooth: true,
      tooltip: {
        showMarkers: true,
        shared: true,
        formatter: (datum) => {
          const point = datum as TemperatureChartPoint;
          return {
            name: point.label,
            value: `${point.temperature}°C`,
          };
        },
      },
      point: {
        size: 4,
        shape: 'circle',
        style: {
          fill: '#1890ff',
          stroke: '#fff',
          lineWidth: 1,
        },
      },
      lineStyle: {
        stroke: '#1890ff',
        lineWidth: 3,
      },
      xAxis: {
        title: {
          text: 'Период',
        },
        label: {
          autoRotate: true,
        },
      },
      yAxis: {
        title: {
          text: 'Температура, °C',
        },
        label: {
          formatter: (value: string) => `${value}°`,
        },
      },
      state: {
        active: {
          style: {
            shadowColor: '#1890ff',
            shadowBlur: 10,
          },
        },
      },
    });

    this.chart.render();
  }

  private loadChartData(): void {
    if (!this.chart) {
      return;
    }

    this.dataSubscription?.unsubscribe();
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.dataSubscription = this.chartDataService
      .getTemperatureSeries(this.city, this.period)
      .subscribe({
        next: (points) => this.handleData(points),
        error: (error: Error) => this.handleError(error),
      });
  }

  private handleData(points: TemperatureChartPoint[]): void {
    this.isLoading.set(false);

    if (!points.length) {
      this.chart?.changeData([]);
      this.errorMessage.set('Нет данных для отображения');
      return;
    }

    this.chart?.changeData(points);
    this.errorMessage.set(null);
  }

  private handleError(error: Error): void {
    console.error('Не удалось загрузить данные для графика', error);
    this.isLoading.set(false);
    this.errorMessage.set('Не удалось загрузить данные для графика');
    this.chart?.changeData([]);
  }
}
