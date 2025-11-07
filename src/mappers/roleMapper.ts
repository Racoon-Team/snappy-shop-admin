import { type BackendRole, type BackendRoleInput, type Role, type RoleInput } from '../types/Role'

export function mapBackendToRole(backendRole: BackendRole): Role {
  return {
    id: backendRole._id,
    name: backendRole.name,
    permissions: backendRole.permissions,
    createdAt: new Date(backendRole.createdAt),
    updatedAt: new Date(backendRole.updatedAt),
  }
}

export function mapRoleInputToBackend(frontendInput: RoleInput): BackendRoleInput {
  return {
    name: frontendInput.name,
    permissions: frontendInput.permissions,
  }
}
