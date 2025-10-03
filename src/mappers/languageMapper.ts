import { type BackendLanguage, type BackendLanguageInput, type Language, type LanguageInput } from '../types/Language'

export function mapBackendToLanguage(backendLang: BackendLanguage): Language {
  return {
    id: backendLang._id,
    name: backendLang.name,
    isoCode: backendLang.iso_code,
    flag: backendLang.flag,
    status: backendLang.status,
    createdAt: new Date(backendLang.createdAt),
    updatedAt: new Date(backendLang.updatedAt),
  }
}

export function mapLanguageInputToBackend(frontendInput: LanguageInput): BackendLanguageInput {
  return {
    name: frontendInput.name,
    iso_code: frontendInput.isoCode,
    flag: frontendInput.flag,
    status: frontendInput.status,
  }
}
