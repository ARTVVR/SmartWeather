import { Component } from '@angular/core';
import { WindChart } from './wind-chart/wind-chart';

@Component({
  selector: 'app-wind-chart-section',
  standalone: true,
  imports: [WindChart],
  templateUrl: './wind-chart-section.html',
  styleUrl: './wind-chart-section.scss',
})
export class WindChartSection {}
