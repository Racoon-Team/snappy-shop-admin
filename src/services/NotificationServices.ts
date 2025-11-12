import requests from '@/services/httpService'
import { mapBackendToNotification, mapNotificationInputToBackend } from '@/mappers/notificationMapper'
import type { NotificationInput, BackendNotification } from '@/types/notification'
import type { PaginationResponse } from '@/types/pagination'

const NotificationServices = {
  addNotification: async (body: NotificationInput) => {
    const backendBody = mapNotificationInputToBackend(body)
    const response = await requests.post<BackendNotification>('/notification/add', backendBody)
    return mapBackendToNotification(response)
  },

  getAllNotification: async (page: number) => {
    const response = await requests.get<PaginationResponse<BackendNotification, { totalUnread: number }>>(
      `/notification?page=${page}`
    )

    const backendData = Array.isArray(response.data) ? response.data : []

    return {
      ...response,
      data: backendData.map(mapBackendToNotification),
    }
  },

  updateStatusNotification: async (id: string, body: Partial<NotificationInput>) => {
    const backendBody = mapNotificationInputToBackend(body as NotificationInput)
    const response = await requests.put<BackendNotification>(`/notification/${id}`, backendBody)
    return mapBackendToNotification(response)
  },

  updateManyStatusNotification: async (body: { ids: string[]; status: 'read' | 'unread' }) => {
    return requests.patch<{ modifiedCount: number }>('/notification/update/many', body)
  },

  deleteNotification: async (id: string) => {
    return requests.delete<{ acknowledged: boolean; deletedCount: number }>(`/notification/${id}`)
  },

  deleteNotificationByProductId: async (id: string) => {
    return requests.delete<{ acknowledged: boolean; deletedCount: number }>(`/notification/product-id/${id}`)
  },

  deleteManyNotification: async (body: { ids: string[] }) => {
    return requests.patch<{ acknowledged: boolean; deletedCount: number }>('/notification/delete/many', body)
  },
}

export default NotificationServices
