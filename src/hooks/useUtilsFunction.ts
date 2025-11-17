import dayjs from 'dayjs'
import { useContext, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SidebarContext } from '@/context/SidebarContext'
import LanguageServices from '@/services/LanguageServices'
import SettingServices from '@/services/SettingServices'
import type { Language } from '@/types/Language'

interface GlobalSetting {
  default_currency?: string
  default_language?: string
  default_date_format?: string
  floating_number?: number
}

interface UtilsFunctionReturn {
  error: unknown
  loading: boolean
  currency: string
  getNumber: (value?: number | string) => number
  getNumberTwo: (value?: number | string) => string
  langError: unknown
  langLoading: boolean
  showTimeFormat: (data: string | Date, timeFormat: string) => string
  showDateFormat: (data: string | Date) => string
  showDateTimeFormat: (data: string | Date) => string
  showingImage: (data: string | undefined) => string | false
  showingUrl: (data: string | undefined) => string
  languages?: Language[]
  globalSetting?: GlobalSetting
  showingTranslateValue: (data: Record<string, string> | undefined) => string
}

const useUtilsFunction = (): UtilsFunctionReturn => {
  const { lang } = useContext(SidebarContext)

  // Obtener configuración global
  const {
    error,
    isLoading: loading,
    data: globalSetting,
  } = useQuery<GlobalSetting>({
    queryKey: ['globalSetting'],
    queryFn: async () => await SettingServices.getGlobalSetting(),
    staleTime: 20 * 60 * 1000,
    gcTime: 25 * 60 * 1000,
  })

  const {
    data: languages,
    error: langError,
    isLoading: langLoading,
  } = useQuery<Language[]>({
    queryKey: ['languages'],
    queryFn: async () => await LanguageServices.getShowingLanguage(),
    staleTime: 20 * 60 * 1000,
    gcTime: 25 * 60 * 1000,
  })

  const showTimeFormat = (data: string | Date, timeFormat: string) => {
    return dayjs(data).format(timeFormat)
  }

  const showDateFormat = (data: string | Date) => {
    return dayjs(data).format(globalSetting?.default_date_format || 'YYYY-MM-DD')
  }

  const showDateTimeFormat = (data: string | Date) => {
    return dayjs(data).format(`${globalSetting?.default_date_format || 'YYYY-MM-DD'} h:mm A`)
  }

  const getNumber = (value: number | string = 0) => {
    return Number(parseFloat(String(value) || '0').toFixed(2))
  }

  const getNumberTwo = (value: number | string = 0) => {
    return parseFloat(String(value) || '0')
      .toFixed(globalSetting?.floating_number || 2)
      .toString()
  }

  const showingTranslateValue = useMemo(() => {
    return (data: Record<string, string> | undefined): string => {
      if (!data || typeof data !== 'object') return ''
      return data[lang] ?? data[globalSetting?.default_language ?? ''] ?? data['en'] ?? ''
    }
  }, [lang, globalSetting?.default_language])

  const showingImage = (data?: string) => (data ? data : false)
  const showingUrl = (data?: string) => (data ? data : '!#')
  const currency = globalSetting?.default_currency || '$'

  return {
    error,
    loading,
    currency,
    getNumber,
    getNumberTwo,
    langError,
    langLoading,
    showTimeFormat,
    showDateFormat,
    showDateTimeFormat,
    showingImage,
    showingUrl,
    languages,
    globalSetting,
    showingTranslateValue,
  }
}

export default useUtilsFunction
