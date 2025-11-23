import { Injectable } from '@angular/core';
import { PaginationInfo } from '../interfaces/common.interface';
import { PAGINATION_CONFIG } from '../../shared/constants/weather.constants';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  getPaginatedData<T>(data: T[], currentPage: number, itemsPerPage: number): T[] {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }

  getTotalPages(totalItems: number, itemsPerPage: number): number {
    return Math.ceil(totalItems / itemsPerPage);
  }

  getVisiblePageNumbers(currentPage: number, totalPages: number): (number | string)[] {
    if (totalPages <= PAGINATION_CONFIG.MAX_PAGES_WITHOUT_DOTS) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const { VISIBLE_PAGES_RANGE } = PAGINATION_CONFIG;
    const start = Math.max(2, currentPage - VISIBLE_PAGES_RANGE);
    const end = Math.min(totalPages - 1, currentPage + VISIBLE_PAGES_RANGE);
    const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    const result: (number | string)[] = [];

    if (currentPage - VISIBLE_PAGES_RANGE > 2) {
      result.push(1, '...');
    } else {
      result.push(1);
    }

    result.push(...range);

    if (currentPage + VISIBLE_PAGES_RANGE < totalPages - 1) {
      result.push('...', totalPages);
    } else if (totalPages > 1) {
      result.push(totalPages);
    }

    return result;
  }

  getPaginationInfo(
    currentPage: number,
    itemsPerPage: number,
    totalItems: number,
  ): PaginationInfo {
    return {
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages: this.getTotalPages(totalItems, itemsPerPage),
    };
  }
}
