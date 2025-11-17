import requests from '../services/httpService'
import { type Language, type LanguageInput, type BackendLanguage } from '../types/Language'
import { mapBackendToLanguage, mapLanguageInputToBackend } from '../mappers/languageMapper'

interface IMessageResponse {
  message: string
  messageKey?: string
}

const LanguageServices = {
  getAllLanguages: async (): Promise<Language[]> => {
    const backendLanguages = await requests.get<BackendLanguage[]>('/language/all')
    return backendLanguages.map(mapBackendToLanguage)
  },

  getShowingLanguage: async (): Promise<Language[]> => {
    const backendLanguages = await requests.get<BackendLanguage[]>('/language/show')
    return backendLanguages.map(mapBackendToLanguage)
  },

  getLanguageById: async (id: string): Promise<Language> => {
    const backendLanguage = await requests.get<BackendLanguage>(`/language/${id}`)
    return mapBackendToLanguage(backendLanguage)
  },

  addLanguage: async (body: LanguageInput): Promise<IMessageResponse> => {
    const backendBody = mapLanguageInputToBackend(body)
    return requests.post<IMessageResponse>('/language/add', backendBody)
  },

  addAllLanguage: async (body: LanguageInput[]): Promise<IMessageResponse> => {
    const backendBody = body.map(mapLanguageInputToBackend)
    return requests.post<IMessageResponse>('/language/add/all', backendBody)
  },

  updateLanguage: async (id: string, body: Partial<LanguageInput>): Promise<IMessageResponse> => {
    const backendBody = mapLanguageInputToBackend(body as LanguageInput)
    return requests.put<IMessageResponse>(`/language/${id}`, backendBody)
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
