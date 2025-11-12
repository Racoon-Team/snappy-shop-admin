export interface PaginationResponse<T, A = Record<string, any>> {
  data: T[]
  total: number
  pages: number
  limit: number
  additionalInfo: A
}
