export interface Notification {
  _id?: string; 
  userId: string; 
  productId?: string; 
  message: string;
  status?: 'read' | 'unread' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}
export interface PaginationResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
}
