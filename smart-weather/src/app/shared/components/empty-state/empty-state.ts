import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  templateUrl: './empty-state.html',
  styleUrls: ['./empty-state.scss'],
})
export class EmptyState {
  icon = input<string>('🔍');
  title = input<string>('Ничего не найдено');
  description = input<string>('Попробуйте изменить поисковый запрос');
}

