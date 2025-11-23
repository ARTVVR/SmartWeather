import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.scss'],
})
export class Pagination {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  visiblePageNumbers = input.required<(number | string)[]>();
  paginatedCount = input.required<number>();
  totalCount = input.required<number>();
  canNavigatePrevious = input.required<boolean>();
  canNavigateNext = input.required<boolean>();

  pageChange = output<number>();
  nextPage = output<void>();
  previousPage = output<void>();

  onPageChange(page: number | string): void {
    if (typeof page === 'number') {
      this.pageChange.emit(page);
    }
  }

  onNextPage(): void {
    if (this.canNavigateNext()) {
      this.nextPage.emit();
    }
  }

  onPreviousPage(): void {
    if (this.canNavigatePrevious()) {
      this.previousPage.emit();
    }
  }
}

