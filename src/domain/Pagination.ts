interface PaginationDetails {
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

interface PaginatedResponse<T> {
  data: T;
  pagination: PaginationDetails;
}

interface PaginatedParams {
  pagination?: boolean;
  page?: number;
  page_size?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  search_term?: string;
}

export type {PaginatedParams, PaginationDetails, PaginatedResponse};
