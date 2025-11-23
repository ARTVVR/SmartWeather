import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TemperatureChartSection } from '../../components/temperature-chart-section/temperature-chart-section';
import { TemperatureGraphSection } from '../../components/temperature-graph-section/temperature-graph-section';
import { HumidityGraphSection } from '../../components/humidity-graph-section/humidity-graph-section';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NzButtonModule,
    CommonModule,
    TemperatureChartSection,
    TemperatureGraphSection,
    HumidityGraphSection,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  columns = [
    {
      title: 'Ветер',
      subtitle: 'Скорость ветра по странам СНГ',
      description: 'Визуализируйте распределение ветровых потоков через диаграммы',
      background: 'wind.jpg',
    },
    {
      title: 'Влажность',
      subtitle: 'Недельные показатели влажности для Минска',
      description: 'Планируйте деятельность на основе данных об атмосферной влажности',
      background: 'humidity.jpg',
    },
    {
      title: 'Графики',
      subtitle: 'Интерактивные временные ряды температур',
      description: 'Выбирайте период наблюдения день неделя или месяц для анализа',
      background: 'temperature.jpg',
    },
  ];
}
