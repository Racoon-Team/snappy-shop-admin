import requests from '../services/httpService'
import { type ILanguage, type ILanguageInput } from '../types/Language'

interface IMessageResponse {
  message: string
  messageKey?: string
}

const LanguageServices = {
  getAllLanguages: async (): Promise<ILanguage[]> => {
    return requests.get<ILanguage[]>('/language/all')
  },

  getShowingLanguage: async (): Promise<ILanguage[]> => {
    return requests.get<ILanguage[]>('/language/show')
  },

  getLanguageById: async (id: string): Promise<ILanguage> => {
    return requests.get<ILanguage>(`/language/${id}`)
  },

  addLanguage: async (body: ILanguageInput): Promise<IMessageResponse> => {
    return requests.post<IMessageResponse>('/language/add', body)
  },

  addAllLanguage: async (body: ILanguageInput[]): Promise<IMessageResponse> => {
    return requests.post<IMessageResponse>('/language/add/all', body)
  },

  updateLanguage: async (id: string, body: Partial<ILanguageInput>): Promise<IMessageResponse> => {
    return requests.put<IMessageResponse>(`/language/${id}`, body)
  },

  updateManyLanguage: async (body: { ids: string[]; status: 'show' | 'hide' }): Promise<IMessageResponse> => {
    return requests.patch<IMessageResponse>('language/update/many', body)
  },

  updateStatus: async (id: string, body: { status: 'show' | 'hide' }): Promise<IMessageResponse> => {
    return requests.put<IMessageResponse>(`/language/status/${id}`, body)
  },

  deleteLanguage: async (id: string, body: unknown = {}): Promise<IMessageResponse> => {
    return requests.patch<IMessageResponse>(`/language/${id}`, body)
  },

  deleteManyLanguage: async (body: { ids: string[] }): Promise<IMessageResponse> => {
    return requests.patch<IMessageResponse>('/language/delete/many', body)
  },
}

export default LanguageServices
