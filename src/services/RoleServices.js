import requests from './httpService'

const RoleServices = {
  getRoles: async () => {
    return requests.get('/roles')
  },

  getRoleById: async (id) => {
    return requests.get(`/roles/${id}`)
  },

  createRole: async (body) => {
    return requests.post('/roles/add', body)
  },

  updateRole: async (id, body) => {
    return requests.put(`/roles/${id}`, body)
  },

  deleteRole: async (id) => {
    return requests.delete(`/roles/${id}`)
  },
}

export default RoleServices
