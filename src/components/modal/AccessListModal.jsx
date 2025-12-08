import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, Button } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'

const AccessListModal = ({ isOpen, onClose, staff, roles, showingTranslateValue }) => {
  const { t } = useTranslation()
  const [accessList, setAccessList] = useState([])

  useEffect(() => {
    if (isOpen && staff?.role && roles?.length) {
      const userRole = roles.find((role) => role.id === staff.role)
      setAccessList(userRole?.permissions || [])
    } else {
      setAccessList([])
    }
  }, [isOpen, staff, roles])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-xl font-medium text-center pb-6 dark:text-gray-300">
        {t('staffScreen.accesslistModal.text')}{' '}
        <span className="text-emerald-600">{showingTranslateValue(staff?.name)}</span>
      </h1>
      <ModalBody>
        {accessList.length > 0 ? (
          <ol className="list-disc pl-5">
            {accessList.map((route, index) => {
              const camelCaseKey = route.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
              return (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 ">
                  {t(`staffScreen.drawer.selectAccess.${camelCaseKey}`)}
                </li>
              )
            })}
          </ol>
        ) : (
          <p className="text-orange-500 py-10 text-lg text-center">{t('staffScreen.accesslistModal.message')}</p>
        )}
      </ModalBody>
      <ModalFooter className="justify-end">
        <Button className="w-full sm:w-auto bg-red-400 text-white hover:bg-red-500" layout="delete" onClick={onClose}>
          {t('common.closeBtn')}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default AccessListModal
