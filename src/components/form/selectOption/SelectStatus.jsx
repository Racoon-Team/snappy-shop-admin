import React, { useContext } from 'react'
import { Select } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'

//internal import
import OrderServices from '@/services/OrderServices'
import { notifySuccess, notifyError } from '@/utils/toast'
import { SidebarContext } from '@/context/SidebarContext'

const SelectStatus = ({ id, order }) => {
  const { t } = useTranslation()
  // console.log('id',id ,'order',order)
  const { setIsUpdate } = useContext(SidebarContext)
  const handleChangeStatus = (id, status) => {
    // return notifyError("This option disabled for this option!");
    OrderServices.updateOrder(id, { status: status })
      .then((res) => {
        notifySuccess(t('common.statusMessage'))
        setIsUpdate(true)
      })
      .catch((err) => notifyError(err.message))
  }
  const currentStatus = order?.status
  const isLocked = currentStatus === 'Delivered' || currentStatus === 'Cancel'

  return (
    <>
      <Select
        onChange={(e) => handleChangeStatus(id, e.target.value)}
        className="h-8"
        value={currentStatus}
        disabled={isLocked}
      >
        <option value="Pending" disabled={currentStatus === 'Processing'}>
          {t('ordersScreen.status.orderPending')}
        </option>
        <option value="Processing">{t('ordersScreen.status.orderProcessing')}</option>
        <option value="Delivered" disabled={currentStatus === 'Pending'}>
          {t('ordersScreen.status.orderDelivered')}
        </option>
        <option value="Cancel">{t('ordersScreen.status.orderCancel')}</option>
      </Select>
    </>
  )
}

export default SelectStatus
