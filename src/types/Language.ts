export interface BackendLanguage {
  _id: string
  name: string
  iso_code: string
  flag?: string
  status: 'show' | 'hide'
  createdAt: string
  updatedAt: string
}
export interface BackendLanguageInput {
  name: string
  iso_code: string
  flag?: string
  status?: 'show' | 'hide'
}
export interface Language {
  id: string
  name: string
  isoCode: string
  flag?: string
  status: 'show' | 'hide'
  createdAt: Date
  updatedAt: Date
}
export interface LanguageInput {
  name: string
  isoCode: string
  flag?: string
  status?: 'show' | 'hide'
}
