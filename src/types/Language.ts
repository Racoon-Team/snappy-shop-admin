export const LanguageStatus = {
  SHOW: 'show',
  HIDE: 'hide',
} as const;
export type LanguageStatus = (typeof LanguageStatus)[keyof typeof LanguageStatus];
export interface BackendLanguage {
  _id: string
  name: string
  iso_code: string
  flag?: string
  status: LanguageStatus
  createdAt: string
  updatedAt: string
}
export interface BackendLanguageInput {
  name: string
  iso_code: string
  flag?: string
  status?: LanguageStatus
}
export interface Language {
  id: string
  name: string
  isoCode: string
  flag?: string
  status: LanguageStatus
  createdAt: Date
  updatedAt: Date
}
export interface LanguageInput {
  name: string
  isoCode: string
  flag?: string
  status?: LanguageStatus
}
