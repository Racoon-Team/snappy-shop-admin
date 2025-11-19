import { Button, Modal, ModalBody, ModalFooter } from '@windmill/react-ui'
import React, { useContext, useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import spinnerLoadingImage from '@/assets/img/spinner.gif'
import { SidebarContext } from '@/context/SidebarContext'
import AdminServices from '@/services/AdminServices'
import CategoryServices from '@/services/CategoryServices'
import CouponServices from '@/services/CouponServices'
import CustomerServices from '@/services/CustomerServices'
import LanguageServices from '@/services/LanguageServices'
import ProductServices from '@/services/ProductServices'
import useToggleDrawer from '@/hooks/useToggleDrawer'
import AttributeServices from '@/services/AttributeServices'
import CurrencyServices from '@/services/CurrencyServices'
import RoleServices from '@/services/RoleServices'
import SettingServices from '@/services/SettingServices'
import { notifyError, notifySuccess } from '@/utils/toast'
import useDisableForDemo from '@/hooks/useDisableForDemo'

interface DeleteModalProps {
  id?: string
  ids?: string[]
  setIsCheck?: React.Dispatch<React.SetStateAction<string[]>>
  category?: boolean
  title: string
  useParamId?: string
  onSuccess?: () => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({ id, ids, setIsCheck, category, title, useParamId, onSuccess }) => {
  const { isModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext)
  const { setServiceId } = useToggleDrawer()
  const location = useLocation()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { handleDisableForDemo } = useDisableForDemo()

  const handleDelete = async (): Promise<void> => {
    if (handleDisableForDemo()) {
      return
    }
    try {
      setIsSubmitting(true)
      if (location.pathname === '/products') {
        if (ids) {
          const res = await ProductServices.deleteManyProducts({
            ids: ids,
          })
          setIsUpdate(true)
          notifySuccess(t('productsScreen.message.delete'))
          setIsCheck?.([])
          setServiceId()
          closeModal()
          setIsSubmitting(false)
        } else {
          const res = await ProductServices.deleteProduct(id!)
          setIsUpdate(true)
          notifySuccess(t('productsScreen.message.delete'))
          setServiceId()
          closeModal()
          setIsSubmitting(false)
        }
      }

      if (location.pathname === '/coupons') {
        if (ids) {
          const res = await CouponServices.deleteManyCoupons({
            ids: ids,
          })
          setIsUpdate(true)
          notifySuccess(t('couponsScreen.message.delete'))
          setIsCheck?.([])
          setServiceId()
          closeModal()
          setIsSubmitting(false)
        } else {
          const res = await CouponServices.deleteCoupon(id!)
          setIsUpdate(true)
          notifySuccess(t('couponsScreen.message.delete'))
          setServiceId()
          closeModal()
          setIsSubmitting(false)
        }
      }

      if (location.pathname === '/categories' || category) {
        if (ids) {
          const res = await CategoryServices.deleteManyCategory({
            ids: ids,
          })
          setIsUpdate(true)
          notifySuccess(t('categoriesScreen.message.delete'))
          setIsCheck?.([])
          setServiceId()
          closeModal()
          setIsSubmitting(false)
        } else {
          if (id === undefined || !id) {
            notifyError('Please select a category first!')
            setIsSubmitting(false)
            return closeModal()
          }
          const res = await CategoryServices.deleteCategory(id)
          setIsUpdate(true)
          notifySuccess(t('categoriesScreen.message.delete'))
          closeModal()
          setServiceId()
          setIsSubmitting(false)
        }
      } else if (location.pathname === `/categories/${useParamId}` || category) {
        if (id === undefined || !id) {
          notifyError('Please select a category first!')
          setIsSubmitting(false)
          return closeModal()
        }

        const res = await CategoryServices.deleteCategory(id)
        setIsUpdate(true)
        notifySuccess(res.message)
        closeModal()
        setServiceId()
        setIsSubmitting(false)
      }

      if (location.pathname === '/customers') {
        const res = await CustomerServices.deleteCustomer(id!)
        setIsUpdate(true)
        notifySuccess(t('customerScreen.message.delete'))
        setServiceId()
        closeModal()
        setIsSubmitting(false)
      }

      if (location.pathname === '/attributes') {
        if (ids) {
          const res = await AttributeServices.deleteManyAttribute({
            ids: ids,
          })
          setIsUpdate(true)
          notifySuccess(t('attributesScreen.message.pluralDelete'))
          setIsCheck?.([])
          setServiceId()
          closeModal()
          setIsSubmitting(false)
        } else {
          const res = await AttributeServices.deleteAttribute(id!)
          setIsUpdate(true)
          notifySuccess(t('attributesScreen.message.delete'))
          setServiceId()
          closeModal()
          setIsSubmitting(false)
        }
      }

      if (location.pathname === `/attributes/${location.pathname.split('/')[2]}`) {
        if (ids) {
          const res = await AttributeServices.deleteManyChildAttribute({
            id: location.pathname.split('/')[2],
            ids: ids,
          })
          setIsUpdate(true)
          notifySuccess(t('attributesScreen.message.pluralDelete'))
          setServiceId()
          setIsCheck?.([])
          closeModal()
          setIsSubmitting(false)
        } else {
          const res = await AttributeServices.deleteChildAttribute({
            id: id!,
            ids: location.pathname.split('/')[2],
          })
          setIsUpdate(true)
          notifySuccess(t('attributesScreen.message.delete'))
          setServiceId()
          closeModal()
          setIsSubmitting(false)
        }
      }

      if (location.pathname === '/our-staff') {
        const res = await AdminServices.deleteStaff(id!)
        setIsUpdate(true)
        notifySuccess(t('staffScreen.message.delete'))
        setServiceId()
        closeModal()
        setIsSubmitting(false)
      }

      if (location.pathname === '/languages') {
        if (ids) {
          const res = await LanguageServices.deleteManyLanguage({
            ids: ids,
          })
          setIsUpdate(true)
          notifySuccess(t('languagesScreen.message.deleteNotis'))
          setIsCheck?.([])
          closeModal()
          setIsSubmitting(false)
        } else {
          const res = await LanguageServices.deleteLanguage(id!)
          setIsUpdate(true)
          notifySuccess(t('languagesScreen.message.deleteNotification'))
          setServiceId()
          closeModal()
          setIsSubmitting(false)
        }
      }

      if (location.pathname === '/currencies') {
        if (ids) {
          const res = await CurrencyServices.deleteManyCurrency({
            ids: ids,
          })
          setIsUpdate(true)
          notifySuccess(res.message)
          setIsCheck?.([])
          closeModal()
          setIsSubmitting(false)
        } else {
          const res = await CurrencyServices.deleteCurrency(id!)
          setIsUpdate(true)
          notifySuccess(t('currenciesScreen.message.deleteCurrency'))
          setServiceId()
          closeModal()
          setIsSubmitting(false)
        }
      }

      if (location.pathname === '/settings/roles') {
        const res = await RoleServices.deleteRole(id!)
        setIsUpdate(true)
        notifySuccess(t('roleScreen.message.delete'))
        setServiceId()
        closeModal()
        setIsSubmitting(false)
      }

      if (location.pathname.includes('/delivery-points')) {
        const res = await SettingServices.deleteDeliveryPoint(id!)
        console.log('Respuesta del backend:', res)
        setIsUpdate(true)
        notifySuccess(res.message)
        if (onSuccess) onSuccess()
        setServiceId()
        closeModal()
        setIsSubmitting(false)
      }
    } catch (err: any) {
      notifyError(err ? err?.response?.data?.message : err?.message)
      setServiceId()
      setIsCheck?.([])
      closeModal()
      setIsSubmitting(false)
    }
  }

  const { t } = useTranslation()

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
          <span className="flex justify-center text-3xl mb-6 text-red-500">
            <FiTrash2 />
          </span>
          <h2 className="text-xl font-medium mb-2">
            {t('common.modalDelete.deleteModalH2')} <span className="text-red-500">{title}</span>
          </h2>
          <p>{t('common.modalDelete.deleteModalPtag')}</p>
        </ModalBody>

        <ModalFooter className="justify-center">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={closeModal}
          >
            {t('common.modalDelete.modalKeepBtn')}
          </Button>
          <div className="flex justify-end">
            {isSubmitting ? (
              <Button disabled={true} type="button" className="w-full h-12 sm:w-auto">
                <img src={spinnerLoadingImage} alt="Loading" width={20} height={10} />{' '}
                <span className="font-serif ml-2 font-light">{t('Processing')}</span>
              </Button>
            ) : (
              <Button onClick={handleDelete} className="w-full h-12 sm:w-auto">
                {t('common.modalDelete.modalDeletBtn')}
              </Button>
            )}
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default React.memo(DeleteModal)
