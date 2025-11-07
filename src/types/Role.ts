export interface BackendRole {
  _id: string
  name: string
  permissions: string[]
  createdAt: string
  updatedAt: string
}

export interface BackendRoleInput {
  name: string
  permissions: string[]
}

export interface Role {
  id: string
  name: string
  permissions: string[]
  createdAt: Date
  updatedAt: Date
}

export interface RoleInput {
  name: string
  permissions: string[]
}
