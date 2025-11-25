import { Component } from '@angular/core';
import { HumidityChart } from './humidity-chart/humidity-chart';

@Component({
  selector: 'app-humidity-graph-section',
  standalone: true,
  imports: [HumidityChart],
  templateUrl: './humidity-graph-section.html',
  styleUrl: './humidity-graph-section.scss',
})
export class HumidityGraphSection {}
