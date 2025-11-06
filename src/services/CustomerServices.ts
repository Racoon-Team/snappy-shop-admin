import requests from './httpService';
import type { Customer, CustomerInput, FilterResponse, ApiResponse } from '@/types/customer';

const CustomerServices = {
  getAllCustomers: async ({ searchText = '' }: { searchText?: string }) => {
    return requests.get<ApiResponse<Customer[]>>(`/customer?searchText=${searchText}`);
  },

  addAllCustomers: async (body: CustomerInput[]) => {
    return requests.post<ApiResponse<{ insertedCount: number }>>('/customer/add/all', body);
  },

  createCustomer: async (body: CustomerInput) => {
    return requests.post<ApiResponse<Customer>>('/customer/create', body);
  },

  filterCustomer: async (email: string) => {
    return requests.post<ApiResponse<FilterResponse>>(`/customer/filter/${email}`);
  },

  getCustomerById: async (id: string) => {
    return requests.get<ApiResponse<Customer>>(`/customer/${id}`);
  },

  updateCustomer: async (id: string, body: Partial<CustomerInput>) => {
    return requests.put<ApiResponse<Customer>>(`/customer/${id}`, body);
  },

  deleteCustomer: async (id: string) => {
    return requests.delete<ApiResponse<{ acknowledged: boolean; deletedCount: number }>>(
      `/customer/${id}`
    );
  },
};

export default CustomerServices;
