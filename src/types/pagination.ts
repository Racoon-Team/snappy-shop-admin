export interface PaginationResponse<T> {
  data: T[];
  total: number;
  pages: number;
  limit: number;
  additionalInfo:{totalUnread:number};
}