import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { FormsModule } from '@angular/forms';
import { TemperaturePeriod } from '../../../../../core/interfaces/weather.interface';

@Component({
  selector: 'app-period-selector',
  standalone: true,
  imports: [NzSegmentedModule, FormsModule],
  templateUrl: './period-selector.html',
  styleUrl: './period-selector.scss',
})
export class PeriodSelector {
  private _selectedPeriod: TemperaturePeriod = 'week';

  @Input()
  set selectedPeriod(period: TemperaturePeriod) {
    this._selectedPeriod = period;
  }

  get selectedPeriod(): TemperaturePeriod {
    return this._selectedPeriod;
  }

  @Output() periodChange = new EventEmitter<TemperaturePeriod>();

  periodOptions = [
    { label: 'День', value: 'day' },
    { label: 'Неделя', value: 'week' },
    { label: 'Месяц', value: 'month' },
  ];

  onPeriodChange(period: TemperaturePeriod) {
    this._selectedPeriod = period;
    this.periodChange.emit(period);
  }
}
