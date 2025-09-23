import React from 'react'
import { Select } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'

const SelectRole = ({ setRole, register, name, label }) => {
  const { t } = useTranslation()
  return (
    <>
      <Select
        onChange={(e) => setRole(e.target.value)}
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>
          {t('loginScreen.createAccount.superAdminRole')}
        </option>
        <option value="Super Admin">{t('loginScreen.createAccount.superAdminRole')}</option>
        <option value="Admin">{t('loginScreen.createAccount.adminRole')}</option>
        <option value="Cashier">{t('loginScreen.createAccount.cashierRole')}</option>
        <option value="CEO">{t('loginScreen.createAccount.ceoRole')}</option>
        <option value="Manager">{t('loginScreen.createAccount.managerRole')}</option>
        <option value="Accountant">{t('loginScreen.createAccount.accountantRole')}</option>
        <option value="Driver">{t('loginScreen.createAccount.driverRole')}</option>
        <option value="Security Guard">{t('loginScreen.createAccount.securityGuardRole')}</option>
        <option value="Delivery Person">{t('loginScreen.createAccount.deliveryPersonRole')}</option>
        <option value="Seller">{t('loginScreen.createAccount.sellerRole')}</option>
      </Select>
    </>
  )
}

export default SelectRole
