import { type BackendNotification, type BackendNotificationInput, type Notification, type NotificationInput } from '../types/notification'

export function mapBackendToNotification(backendNotif: BackendNotification): Notification {
  return {
    id: backendNotif._id,
    orderId: backendNotif.orderId,
    productId: backendNotif.productId,
    adminId: backendNotif.adminId,
    message: backendNotif.message,
    image: backendNotif.image,
    status: backendNotif.status,
    createdAt: new Date(backendNotif.createdAt),
    updatedAt: new Date(backendNotif.updatedAt),
  }
}

export function mapNotificationInputToBackend(frontendInput: NotificationInput): BackendNotificationInput {
  return {
    orderId: frontendInput.orderId,
    productId: frontendInput.productId,
    adminId: frontendInput.adminId,
    message: frontendInput.message,
    image: frontendInput.image,
    status: frontendInput.status ?? 'unread',
  }
}
