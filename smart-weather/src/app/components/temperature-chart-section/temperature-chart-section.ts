import { Component } from '@angular/core';
import { TemperatureTable } from './temperature-table/temperature-table';

@Component({
  selector: 'app-temperature-chart-section',
  standalone: true,
  imports: [TemperatureTable],
  templateUrl: './temperature-chart-section.html',
  styleUrl: './temperature-chart-section.scss',
})
export class TemperatureChartSection {}
