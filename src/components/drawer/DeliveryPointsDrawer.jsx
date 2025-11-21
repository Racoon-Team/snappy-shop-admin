import React, { useState, useEffect } from 'react'
import { Select } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import Error from '@/components/form/others/Error'
import Title from '@/components/form/others/Title'
import LabelArea from '@/components/form/selectOption/LabelArea'
import InputArea from '@/components/form/input/InputArea'
import DrawerButton from '@/components/form/button/DrawerButton'
import useDeliveryPoints from '@/hooks/useDeliveryPoints'
import useReverseGeocode from '@/hooks/useReverseGeocode'
import AdminServices from '@/services/AdminServices'
import InputValue from '@/components/form/input/InputValue'
import useUtilsFunction from '@/hooks/useUtilsFunction'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const ClickMarker = ({ onMapClick }) => {
  const [coords, setCoords] = useState(null)
  const { address } = useReverseGeocode(coords?.[0], coords?.[1])

  useMapEvents({
    click(e) {
      const lat = e.latlng.lat
      const lon = e.latlng.lng
      setCoords([lat, lon])
    },
  })

  useEffect(() => {
    if (coords && address) {
      onMapClick(coords, address)
    }
  }, [coords, address])
  return null
}

const DeliveryPointsDrawer = ({ id, onSuccess }) => {
  const { t, i18n } = useTranslation()
  const handleSelectLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }
  const { register, handleSubmit, onSubmit, errors, isSubmitting, setValue } = useDeliveryPoints(id)

  const { currency } = useUtilsFunction()
  const [position, setPosition] = useState([-16.5, -68.15])
  const [address, setAddress] = useState('')
  const [locations, setLocations] = useState([])
  const [loadingLocations, setLoadingLocations] = useState(true)

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await AdminServices.getAvailableLocations()
        setLocations(data)
      } catch (error) {
        console.error('Error getting locations:', error)
      } finally {
        setLoadingLocations(false)
      }
    }

    fetchLocations()
  }, [])

  const handleMapClick = (coords, street) => {
    setPosition(coords)
    setAddress(street)
    setValue('streetName', street)
  }
  const drawerTitle = id
    ? t('deliveryPointsScreen.deliveryDrawer.titleUpdate')
    : t('deliveryPointsScreen.deliveryDrawer.titleAdd')

  const drawerDesc = id
    ? t('deliveryPointsScreen.deliveryDrawer.descriptionUpdate')
    : t('deliveryPointsScreen.deliveryDrawer.descriptionAdd')

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <Title title={drawerTitle} description={drawerDesc} />
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form
          onSubmit={handleSubmit(async (formData) => {
            await onSubmit(formData)
            if (onSuccess) onSuccess()
          })}
        >
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <div className="col-span-8 sm:col-span-4">
                <MapContainer
                  center={position}
                  zoom={15}
                  style={{ width: '1220px', height: '600px', cursor: 'default' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <ClickMarker onMapClick={handleMapClick} />
                  <Marker position={position} />
                </MapContainer>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('deliveryPointsScreen.deliveryDrawer.labelLocation')} />
              <div className="col-span-8 sm:col-span-4">
                <Select {...register('location', { required: true })} disabled={loadingLocations}>
                  <option value="">{t('deliveryPointsScreen.deliveryDrawer.select')}</option>
                  {locations.map((loc) => (
                    <option key={loc.key} value={loc.key}>
                      {loc.label}
                    </option>
                  ))}
                </Select>
                <Error errorName={errors.location} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('deliveryPointsScreen.deliveryDrawer.labelStreetName')} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  value={address}
                  register={register}
                  name="streetName"
                  label={t('deliveryPointsScreen.deliveryDrawer.inputStreetName')}
                  required={true}
                  placeholder={t('deliveryPointsScreen.deliveryDrawer.inputStreetName')}
                />
                <Error errorName={errors.streetName} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('deliveryPointsScreen.deliveryDrawer.labelPlaceName')} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  name="placeName"
                  label={t('deliveryPointsScreen.deliveryDrawer.inputPlaceName')}
                  required={true}
                  placeholder={t('deliveryPointsScreen.deliveryDrawer.inputPlaceName')}
                />
                <Error errorName={errors.placeName} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('deliveryPointsScreen.deliveryDrawer.labelDetails')} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label={t('deliveryPointsScreen.deliveryDrawer.inputDetails')}
                  name="details"
                  required={true}
                  placeholder={t('deliveryPointsScreen.deliveryDrawer.inputDetails')}
                />
                <Error errorName={errors.details} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('deliveryPointsScreen.deliveryDrawer.shippingCost')} />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  maxValue={200}
                  minValue={0}
                  label={t('deliveryPointsScreen.deliveryDrawer.shippingCost')}
                  name="shippingCost"
                  type="number"
                  defaultValue={0.0}
                  required={true}
                  product
                  currency={currency}
                />
                <Error errorName={errors.shippingCost} />
              </div>
            </div>
          </div>

          <DrawerButton
            id={id}
            title={t('deliveryPointsScreen.deliveryDrawer.titleAddDeliveryPointBtn')}
            isSubmitting={isSubmitting}
          />
        </form>
      </Scrollbars>
    </>
  )
}

export default DeliveryPointsDrawer
