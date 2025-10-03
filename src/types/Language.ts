export interface ILanguage {
  _id?: string
  name: string
  iso_code: string
  flag?: string
  status?: 'show' | 'hide'
  createdAt?: string
  updatedAt?: string
}

export interface ILanguageInput {
  name: string
  iso_code: string
  flag?: string
  status?: 'show' | 'hide'
}
