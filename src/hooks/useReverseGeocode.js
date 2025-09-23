import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const BASE_URL = import.meta.env.VITE_APP_NOMINATIM_API_URL

const useReverseGeocode = (lat, lon) => {
  const { t } = useTranslation()
  const [data, setData] = useState({ name: '', address: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const shortenAddress = (address) =>
    address
      ? address
          .split(',')
          .map((part) => part.trim())
          .slice(0, 2)
          .join(', ')
      : t('deliveryPointsScreen.form.direction')

  useEffect(() => {
    if (!lat || !lon) return

    const fetchAddress = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${BASE_URL}?format=jsonv2&lat=${lat}&lon=${lon}`)
        const result = await response.json()

        const rawAddress = result.display_name || ''
        const shortAddress = shortenAddress(rawAddress)

        setData({
          name: result.name || shortAddress || t('deliveryPointsScreen.form.unnamed'),
          address: shortAddress,
        })
      } catch (err) {
        setError(t('deliveryPointsScreen.form.error'))
        setData({
          name: t('deliveryPointsScreen.form.unnamed'),
          address: t('deliveryPointsScreen.form.direction'),
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAddress()
  }, [lat, lon])

  return { ...data, loading, error }
}

export default useReverseGeocode
