import requests from '../services/httpService'
import { type Currency, type CurrencyInput, type BackendCurrency } from '../types/Currency'
import { mapBackendToCurrency, mapCurrencyInputToBackend } from '../mappers/currencyMapper'

interface IMessageResponse {
  message: string
  messageKey?: string
}

const CurrencyServices = {
  getAllCurrency: async (): Promise<Currency[]> => {
    const backendCurrencies = await requests.get<BackendCurrency[]>('/currency')
    return backendCurrencies.map(mapBackendToCurrency)
  },

  getShowingCurrency: async (): Promise<Currency[]> => {
    const backendCurrencies = await requests.get<BackendCurrency[]>('/currency/show')
    return backendCurrencies.map(mapBackendToCurrency)
  },

  getCurrencyById: async (id: string): Promise<Currency> => {
    const backendCurrency = await requests.get<BackendCurrency>(`/currency/${id}`)
    return mapBackendToCurrency(backendCurrency)
  },

  addCurrency: async (body: CurrencyInput): Promise<IMessageResponse> => {
    const backendBody = mapCurrencyInputToBackend(body)
    return requests.post<IMessageResponse>('/currency/add', backendBody)
  },

  addAllCurrency: async (body: CurrencyInput[]): Promise<IMessageResponse> => {
    const backendBody = body.map(mapCurrencyInputToBackend)
    return requests.post<IMessageResponse>('/currency/add/all', backendBody)
  },

  updateCurrency: async (id: string, body: Partial<CurrencyInput>): Promise<IMessageResponse> => {
    const backendBody = mapCurrencyInputToBackend(body as CurrencyInput)
    return requests.put<IMessageResponse>(`/currency/${id}`, backendBody)
  },

  updateManyCurrencies: async (body: {
    ids: string[]
    enabled?: 'show' | 'hide'
    live_exchange_rates?: 'show' | 'hide'
  }): Promise<IMessageResponse> => {
    return requests.patch<IMessageResponse>('currency/update/many', body)
  },

  updateEnabledStatus: async (id: string, body: { status: 'show' | 'hide' }): Promise<IMessageResponse> => {
    return requests.put<IMessageResponse>(`/currency/status/enabled/${id}`, body)
  },

  updateLiveExchangeRateStatus: async (
    id: string,
    body: { live_exchange_rates: 'show' | 'hide' }
  ): Promise<IMessageResponse> => {
    return requests.put<IMessageResponse>(`/currency/status/live-exchange-rates/${id}`, body)
  },

  deleteCurrency: async (id: string): Promise<IMessageResponse> => {
    return requests.delete<IMessageResponse>(`/currency/${id}`)
  },

  deleteManyCurrency: async (body: { ids: string[] }): Promise<IMessageResponse> => {
    return requests.patch<IMessageResponse>('/currency/delete/many', body)
  },
}

export default CurrencyServices
