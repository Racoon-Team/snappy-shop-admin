export interface BackendCurrency {
  _id: string
  name: string
  symbol?: string
  status: 'show' | 'hide'
  live_exchange_rates: 'show' | 'hide'
  createdAt: string
  updatedAt: string
}

export interface BackendCurrencyInput {
  name: string
  symbol?: string
  status?: 'show' | 'hide'
}

export interface Currency {
  id: string
  name: string
  symbol?: string
  status: 'show' | 'hide'
  liveExchangeRates: 'show' | 'hide'
  createdAt: Date
  updatedAt: Date
}

export interface CurrencyInput {
  name: string
  symbol?: string
  status?: 'show' | 'hide'
}
