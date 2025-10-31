import { type BackendCurrency, type BackendCurrencyInput, type Currency, type CurrencyInput } from '../types/Currency'

export function mapBackendToCurrency(backendCurr: BackendCurrency): Currency {
  return {
    id: backendCurr._id,
    name: backendCurr.name,
    symbol: backendCurr.symbol,
    status: backendCurr.status,
    liveExchangeRates: backendCurr.live_exchange_rates,
    createdAt: new Date(backendCurr.createdAt),
    updatedAt: new Date(backendCurr.updatedAt),
  }
}

export function mapCurrencyInputToBackend(frontendInput: CurrencyInput): BackendCurrencyInput {
  return {
    name: frontendInput.name,
    symbol: frontendInput.symbol,
    status: frontendInput.status,
  }
}
