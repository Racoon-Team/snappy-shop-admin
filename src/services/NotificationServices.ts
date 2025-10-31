import requests from '@/services/httpService';
import{ type Notification } from '@/types/notification';
import {type PaginationResponse} from '@/types/notification';

const NotificationServices = {
  addNotification: async (body: Notification) => {
    return requests.post<Notification>('/notification/add', body);
  },

  getAllNotification: async (page: number) => {
    return requests.get<PaginationResponse<Notification>>(`/notification?page=${page}`);
  },

  updateStatusNotification: async (id: string, body: Partial<Notification>) => {
    return requests.put<Notification>(`/notification/${id}`, body);
  },

  updateManyStatusNotification: async (body: { ids: string[]; status: 'read' | 'unread' }) => {
    return requests.patch<{ modifiedCount: number }>('/notification/update/many', body);
  },

  deleteNotification: async (id: string) => {
    return requests.delete<{ acknowledged: boolean; deletedCount: number }>(`/notification/${id}`);
  },

  deleteNotificationByProductId: async (id: string) => {
    return requests.delete<{ acknowledged: boolean; deletedCount: number }>(
      `/notification/product-id/${id}`
    );
  },

  deleteManyNotification: async (body: { ids: string[] }) => {
    return requests.patch<{ acknowledged: boolean; deletedCount: number }>(
      `/notification/delete/many`,
      body
    );
  },
};

export default NotificationServices;