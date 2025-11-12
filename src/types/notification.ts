export const notificationStatus = {
  READ: 'read',
  UNREAD: 'unread',
} as const
export type notificationStatusType = (typeof notificationStatus)[keyof typeof notificationStatus]
export interface BackendCurrencyInput {
  name: string
  symbol?: string
  status?: notificationStatusType
}

export interface BackendNotification {
  _id: string
  orderId?: string
  productId?: string
  adminId?: string
  message: string
  image?: string
  status: notificationStatusType
  createdAt: string
  updatedAt: string
}

export interface Notification {
  id: string
  orderId?: string
  productId?: string
  adminId?: string
  message: string
  image?: string
  status: notificationStatusType
  createdAt: Date
  updatedAt: Date
}

export interface NotificationInput {
  orderId?: string
  productId?: string
  adminId?: string
  message: string
  image?: string
  status?: notificationStatusType
}

export interface BackendNotificationInput {
  orderId?: string
  productId?: string
  adminId?: string
  message: string
  image?: string
  status?: notificationStatusType
}
