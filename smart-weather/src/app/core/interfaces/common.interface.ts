export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface SearchState<T> {
  term: string;
  filteredData: T[];
}
export interface ColumnItem {
  title: string;
  subtitle: string;
  description: string;
  background: string;
  section: HTMLElement | null;
}
