import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useTranslation } from 'react-i18next'

//internal import
import Title from '@/components/form/others/Title'
import Error from '@/components/form/others/Error'
import InputArea from '@/components/form/input/InputArea'
import LabelArea from '@/components/form/selectOption/LabelArea'
import DrawerButton from '@/components/form/button/DrawerButton'
import useRoleSubmit from '@/hooks/useRoleSubmit'

const allPermissions = [
  'dashboard',
  'products',
  'product',
  'categories',
  'attributes',
  'coupons',
  'orders',
  'order',
  'our-staff',
  'settings',
  'languages',
  'currencies',
  'store',
  'customization',
  'store-settings',
  'notifications',
  'edit-profile',
  'coming-soon',
  'customers',
  'customer-order',
]

const RoleDrawer = ({ id }) => {
  const { t } = useTranslation()
  const { errors, onSubmit, register, isSubmitting, handleSubmit, selectedPermissions, setSelectedPermissions } =
    useRoleSubmit(id)

  const togglePermission = (perm) => {
    if (selectedPermissions.includes(perm)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== perm))
    } else {
      setSelectedPermissions([...selectedPermissions, perm])
    }
  }

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title title={t('roleScreen.drawer.titleUpdate')} description={t('roleScreen.drawer.descriptionUpdate')} />
        ) : (
          <Title title={t('roleScreen.drawer.titleAdd')} description={t('roleScreen.drawer.descriptionAdd')} />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('roleScreen.drawer.labelName')} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Role Name"
                  name="name"
                  type="text"
                  placeholder={t('roleScreen.drawer.inputName')}
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('roleScreen.drawer.labelPermission')} />
              <div className="col-span-8 sm:col-span-4">
                <div className="border p-3 rounded-md max-h-64 overflow-y-auto space-y-2">
                  {allPermissions.map((perm) => (
                    <label key={perm} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(perm)}
                        onChange={() => togglePermission(perm)}
                        className="form-checkbox text-emerald-600"
                      />
                      <span className="capitalize">{perm.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
                <Error errorName={errors.permissions} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title={t('roleScreen.drawer.titleBtn')} zIndex="z-5" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  )
}

export default RoleDrawer
