export type Pagination = {
   total: number;
   current_page: number;
   total_pages: number;
   limit: number;
};

export type Pageable<T> = {
   data: T[];
   pagination: Pagination;
};