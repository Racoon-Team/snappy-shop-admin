import { useContext, useEffect, useState } from 'react'
import { set, useForm, type SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
//internal import
import { SidebarContext } from '@/context/SidebarContext'
import LanguageServices from '@/services/LanguageServices'
import { notifyError, notifySuccess } from '@/utils/toast'
import { LanguageStatus, type LanguageInput } from '@/types/Language'

interface UseLanguageSubmitProps {
  id?: string
}

const useLanguageSubmit = ({ id }: UseLanguageSubmitProps) => {
  const [flagAndName, setFlagAndName] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [languagePublished, setLanguagePublished] = useState<boolean>(true)
  const { t } = useTranslation()
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext)

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm()

  const onSubmit: SubmitHandler<LanguageInput> = async ({ name, isoCode }) => {
    // console.log(name, isoCode, language_code)
    // return notifyError("This option disabled for this option!");
    try {
      setIsSubmitting(true)
      const languageData = {
        name,
        isoCode,
        flag: flagAndName,
        status: languagePublished ? LanguageStatus.SHOW : LanguageStatus.HIDE,
      }

      if (id) {
        const res = await LanguageServices.updateLanguage(id, languageData)
        setIsUpdate(true)
        setIsSubmitting(false)
        notifySuccess(res.message)
      } else {
        const res = await LanguageServices.addLanguage(languageData)
        setIsUpdate(true)
        setIsSubmitting(false)
        notifySuccess(t('languagesScreen.message.addNotification'))
      }
      setFlagAndName('')
      closeDrawer()

    } catch (err: any) {
      notifyError(err?.response?.data?.message?? err?.message)
      closeDrawer()
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue('name','')
      setValue('isoCode','')
      setValue('flag','')
      setLanguagePublished(true)
      setFlagAndName('')
      clearErrors(['name', 'isoCode', 'flag', 'status'])
      return
    }
    if (id) {
      ;(async () => {
        try {
          const res = await LanguageServices.getLanguageById(id)
          if (res) {
            setValue('name', res.name)
            setValue('isoCode', res.isoCode)
            setValue('flag', res.flag ?? '')
            setValue('status', res.status)
            setLanguagePublished(res.status === LanguageStatus.SHOW)
            setFlagAndName(res.flag ?? '')
          }
        } catch (err: any) {
          notifyError(err?.response?.data?.message ?? err?.message)
        }
      })()
    }
  }, [id, setValue, isDrawerOpen, clearErrors])

  return {
    onSubmit,
    register,
    errors,
    handleSubmit,
    flagAndName,
    setFlagAndName,
    isSubmitting,
    languagePublished,
    setLanguagePublished,
  }
}

export default useLanguageSubmit