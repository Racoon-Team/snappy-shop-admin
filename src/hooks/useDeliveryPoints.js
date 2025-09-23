import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import SettingServices from '@/services/SettingServices'
import { notifyError, notifySuccess } from '@/utils/toast'
import { useTranslation } from 'react-i18next'

const useDeliveryPoints = (id) => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [language, setLanguage] = useState('en')
  const [resData, setResData] = useState({ title: {}, name: {} })

  useEffect(() => {
    const fetchPoint = async () => {
      try {
        const data = await SettingServices.getDeliveryPoints()
        const point = data.find((p) => p.id === id)
        if (point) {
          setValue('location', point.location)
          setValue('placeName', point.placeName)
          setValue('streetName', point.streetName)
          setValue('details', point.details)
          setValue('shippingCost', point.shippingCost)
        }
      } catch (error) {
        notifyError(t('deliveryPointsScreen.message.notifyError'))
      }
    }

    if (id) fetchPoint()
  }, [id, setValue])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      if (id) {
        await SettingServices.updateDeliveryPoint(id, data)
        notifySuccess(t('deliveryPointsScreen.message.notifySuccessUpdate'))
      } else {
        await SettingServices.addDeliveryPoint(data)
        notifySuccess(t('deliveryPointsScreen.message.notifySuccessAdd'))
        reset()
      }
    } catch (error) {
      if (id) {
        notifyError(t('deliveryPointsScreen.message.notifyErrorUpdate'))
      } else {
        notifyError(t('deliveryPointsScreen.message.notifyErrorAdd'))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSelectLanguage = (lang) => {
    setLanguage(lang)
    if (Object.keys(resData).length > 0) {
      setValue('title', resData.title[lang || 'en'])
      setValue('name', resData.name[lang || 'en'])
    }
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    handleSelectLanguage,
    language,
    setLanguage,
    setResData,
    setValue,
  }
}

export default useDeliveryPoints
