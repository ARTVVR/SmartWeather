import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { TemperatureChartSection } from '../../components/temperature-chart-section/temperature-chart-section';
import { TemperatureGraphSection } from '../../components/temperature-graph-section/temperature-graph-section';
import { HumidityGraphSection } from '../../components/humidity-graph-section/humidity-graph-section';
import { WindChartSection } from '../../components/wind-chart-section/wind-chart-section';

import { ColumnItem } from '../../core/interfaces/common.interface';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NzButtonModule,
    CommonModule,
    TemperatureChartSection,
    TemperatureGraphSection,
    WindChartSection,
    HumidityGraphSection,
  ],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('windChartSection', { read: ElementRef })
  windChartSection!: ElementRef<HTMLElement>;

  @ViewChild('humidityChartSection', { read: ElementRef })
  humidityChartSection!: ElementRef<HTMLElement>;

  @ViewChild('temperatureGraphSection', { read: ElementRef })
  temperatureGraphSection!: ElementRef<HTMLElement>;

  columns: ColumnItem[] = [
    {
      title: 'Ветер',
      subtitle: 'Скорость ветра по странам СНГ',
      description: 'Визуализируйте распределение ветровых потоков через диаграммы',
      background: 'wind.jpg',
      section: null,
    },
    {
      title: 'Влажность',
      subtitle: 'Недельные показатели влажности для Минска',
      description: 'Планируйте деятельность на основе данных об атмосферной влажности',
      background: 'humidity.jpg',
      section: null,
    },
    {
      title: 'Графики',
      subtitle: 'Интерактивные временные ряды температур',
      description: 'Выбирайте период наблюдения — день, неделя или месяц для анализа',
      background: 'temperature.jpg',
      section: null,
    },
  ];

  ngAfterViewInit(): void {
    this.assignSections();
  }

  private assignSections(): void {
    const sectionRefs = [
      this.windChartSection,
      this.humidityChartSection,
      this.temperatureGraphSection,
    ];

    this.columns.forEach((col, i) => (col.section = sectionRefs[i].nativeElement));
  }

  scrollToTemperature(target: HTMLElement | null): void {
    target?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
