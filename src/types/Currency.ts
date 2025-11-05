export const CurrencyStatus = {
  SHOW: 'show',
  HIDE: 'hide',
} as const

export type CurrencyStatus = (typeof CurrencyStatus)[keyof typeof CurrencyStatus]

export interface BackendCurrency {
  _id: string
  name: string
  symbol?: string
  status: CurrencyStatus
  live_exchange_rates: CurrencyStatus
  createdAt: string
  updatedAt: string
}

export interface BackendCurrencyInput {
  name: string
  symbol?: string
  status?: CurrencyStatus
}

export interface Currency {
  id: string
  name: string
  symbol?: string
  status: CurrencyStatus
  liveExchangeRates: CurrencyStatus
  createdAt: Date
  updatedAt: Date
}

export interface CurrencyInput {
  name: string
  symbol?: string
  status?: CurrencyStatus
}
