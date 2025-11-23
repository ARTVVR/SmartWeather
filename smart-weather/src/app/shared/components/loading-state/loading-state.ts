import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  templateUrl: './loading-state.html',
  styleUrls: ['./loading-state.scss'],
})
export class LoadingState {
  title = input<string>('Загрузка данных');
  description = input<string>('Обновляем информацию о погоде...');
}

