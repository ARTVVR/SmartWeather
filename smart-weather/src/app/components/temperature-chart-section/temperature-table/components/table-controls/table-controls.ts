import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortColumn, SortDirection } from '../../../../../core/interfaces/weather.interface';

@Component({
  selector: 'app-table-controls',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './table-controls.html',
  styleUrls: ['./table-controls.scss'],
})
export class TableControls {
  searchTerm = input.required<string>();
  sortColumn = input.required<SortColumn>();
  sortDirection = input.required<SortDirection>();
  isLoading = input.required<boolean>();

  searchChange = output<string>();
  sortChange = output<SortColumn>();
  refresh = output<void>();

  onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }

  onSortChange(column: SortColumn): void {
    this.sortChange.emit(column);
  }

  onRefresh(): void {
    this.refresh.emit();
  }
}

