// internal imports
import useUtilsFunction from './useUtilsFunction'
import TextTranslateServices from '@/services/TextTranslateServices'
import { type Language } from '../types/Language'
import { useCallback } from 'react'

interface GlobalSetting {
  translationKey?: string
  allowAutoTrans?: boolean
}

type TranslationData = Record<string, string> | null

const useTranslationValue = () => {
  const { globalSetting, languages } = useUtilsFunction() as {
    globalSetting: GlobalSetting
    languages: Language[]
  }

  const cleanInvalidTranslations = useCallback((currentData: TranslationData): TranslationData => {
    if (!currentData) return currentData

    const validData = { ...currentData }

    Object.keys(validData).forEach((lang) => {
      const translation = validData[lang]

      if (
        translation?.toLowerCase().includes('authentication failure') ||
        translation?.toLowerCase().includes('error') ||
        !translation
      ) {
        console.log(`Removing invalid translation for language: ${lang}`)
        delete validData[lang]
      }
    })

    return validData
  }, [])

  const hasKeyChanged = useCallback(
    (currentData: TranslationData, updatedData: TranslationData): boolean => {
      const langIsoCodes = languages?.map((lang) => lang?.isoCode)

      if (!currentData) return true

      if (!updatedData || !langIsoCodes?.length) return false

      return langIsoCodes?.some((lang) => {
        if (!currentData[lang]) return true

        if (!updatedData[lang]) return false

        return currentData[lang] !== updatedData[lang]
      })
    },
    [languages]
  )

  const handleTranslateCallApi = useCallback(
    async (text: string, tnsForm: string, tnsTo: string) => {
      const key = globalSetting?.translationKey || import.meta.env.VITE_APP_MYMEMORY_API_KEY
      try {
        const res = await TextTranslateServices.translateText(text, tnsForm, tnsTo, key)

        const translatedText: string = res?.responseData?.translatedText

        if (
          translatedText?.toLowerCase().includes('authentication failure') ||
          translatedText?.toLowerCase().includes('error') ||
          !translatedText
        ) {
          console.error(`Translation API failed for ${tnsForm} to ${tnsTo}:`, translatedText)
          return null
        }
        return translatedText
      } catch (error) {
        console.error('error on translation', error)
        return null
      }
    },
    [globalSetting]
  )

  const handlerTextTranslateHandler = useCallback(
    async (text: string, tnsForm: string, currentData: TranslationData) => {
      const cleanedCurrentData = cleanInvalidTranslations(currentData)
      if (!globalSetting?.allowAutoTrans) return false

      const isKeyUpdated = hasKeyChanged(cleanedCurrentData, { [tnsForm]: text }) || false

      if (!isKeyUpdated) return false

      const filterLanguage = languages?.filter((lan) => lan?.isoCode !== tnsForm)
      const promisesArray = filterLanguage.map((lan) => {
        return text ? handleTranslateCallApi(text?.toLowerCase(), tnsForm, lan?.isoCode) : ''
      })

      const results = await Promise.all(promisesArray)
      const languageArray = filterLanguage
        .map((lan, index) => {
          const translation = results[index]
          return translation ? { lang: lan?.isoCode, text: translation } : null
        })
        .filter((item): item is { lang: string; text: string } => item !== null)

      // Only include translations that are valid (non-null)
      const objectTnsLanguage = languageArray.reduce<Record<string, string>>(
        (obj, item) => ({ ...obj, [item.lang]: item.text }),
        {}
      )

      if (cleanedCurrentData?.[tnsForm]) {
        objectTnsLanguage[tnsForm] = cleanedCurrentData[tnsForm]
      }

      return objectTnsLanguage
    },
    [cleanInvalidTranslations, globalSetting, hasKeyChanged, handleTranslateCallApi, languages]
  )

  const handleRemoveEmptyKey = useCallback((obj: Record<string, string>) => {
    for (const key in obj) {
      if (obj[key].trim() === '') {
        delete obj[key]
      }
    }
    return obj
  }, [])

  return {
    hasKeyChanged,
    handleRemoveEmptyKey,
    handlerTextTranslateHandler,
  }
}

export default useTranslationValue
