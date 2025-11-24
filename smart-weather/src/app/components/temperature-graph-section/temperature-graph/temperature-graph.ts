import { Component } from '@angular/core';
import { TemperatureChart } from './components/temperature-chart/temperature-chart';
import { PeriodSelector } from './components/period-selector/period-selector';
import { TemperaturePeriod } from '../../../core/interfaces/weather.interface';

@Component({
  selector: 'app-temperature-graph',
  standalone: true,
  imports: [PeriodSelector, TemperatureChart],
  templateUrl: './temperature-graph.html',
  styleUrl: './temperature-graph.scss',
})
export class TemperatureGraph {
  public selectedPeriod: TemperaturePeriod = 'week';

  public onPeriodChange(period: TemperaturePeriod): void {
    this.selectedPeriod = period;
  }
}
