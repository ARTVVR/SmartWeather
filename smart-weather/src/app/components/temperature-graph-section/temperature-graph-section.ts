import { Component } from '@angular/core';
import { TemperatureGraph } from './temperature-graph/temperature-graph';

@Component({
  selector: 'app-temperature-graph-section',
  standalone: true,
  imports: [TemperatureGraph],
  templateUrl: './temperature-graph-section.html',
  styleUrl: './temperature-graph-section.scss',
})
export class TemperatureGraphSection {}
