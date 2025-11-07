import requests from '../services/httpService'
import { type Role, type RoleInput, type BackendRole } from '../types/Role'
import { mapBackendToRole, mapRoleInputToBackend } from '../mappers/roleMapper'

interface IMessageResponse {
  message: string
  messageKey?: string
}

const RoleServices = {
  getRoles: async (): Promise<Role[]> => {
    const backendRoles = await requests.get<BackendRole[]>('/roles')
    return backendRoles.map(mapBackendToRole)
  },

  getRoleById: async (id: string): Promise<Role> => {
    const backendRole = await requests.get<BackendRole>(`/roles/${id}`)
    return mapBackendToRole(backendRole)
  },

  createRole: async (body: RoleInput): Promise<IMessageResponse> => {
    const backendBody = mapRoleInputToBackend(body)
    return requests.post<IMessageResponse>('/roles/add', backendBody)
  },

  updateRole: async (id: string, body: Partial<RoleInput>): Promise<IMessageResponse> => {
    const backendBody = mapRoleInputToBackend(body as RoleInput)
    return requests.put<IMessageResponse>(`/roles/${id}`, backendBody)
  },

  deleteRole: async (id: string): Promise<IMessageResponse> => {
    return requests.delete<IMessageResponse>(`/roles/${id}`)
  },
}

export default RoleServices
