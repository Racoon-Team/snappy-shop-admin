export interface BackendNotification {
  _id: string;
  orderId?: string;
  productId?: string;
  adminId?: string;
  message: string;
  image?: string;
  status: 'read' | 'unread';
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  orderId?: string;
  productId?: string;
  adminId?: string;
  message: string;
  image?: string;
  status: 'read' | 'unread';
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationInput {
  orderId?: string;
  productId?: string;
  adminId?: string;
  message: string;
  image?: string;
  status?: 'read' | 'unread';
}

export interface BackendNotificationInput {
  orderId?: string;
  productId?: string;
  adminId?: string;
  message: string;
  image?: string;
  status?: 'read' | 'unread';
}


