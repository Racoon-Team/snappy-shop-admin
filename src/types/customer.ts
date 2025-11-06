export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface CustomerInput {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface FilterResponse {
  customers: Customer[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
