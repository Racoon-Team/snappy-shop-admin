import React from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useTranslation } from 'react-i18next'
//internal import

import Title from '@/components/form/others/Title'
import Error from '@/components/form/others/Error'
import InputArea from '@/components/form/input/InputArea'
import LabelArea from '@/components/form/selectOption/LabelArea'
import useCustomerSubmit from '@/hooks/useCustomerSubmit'
import DrawerButton from '@/components/form/button/DrawerButton'

const CustomerDrawer = ({ id }) => {
  const { t } = useTranslation()
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useCustomerSubmit(id)

  // console.log('##CustomerDrawer',)
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title title={t('customerScreen.drawer.title')} description={t('customerScreen.drawer.description')} />
        ) : (
          <Title title={'Add Customer'} description={'Add your Customer necessary information from here'} />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('customerScreen.drawer.name')} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label={t('customerScreen.drawer.name')}
                  name="name"
                  type="text"
                  placeholder={t('customerScreen.drawer.name')}
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('customerScreen.drawer.email')} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label={t('customerScreen.drawer.email')}
                  name="email"
                  type="email"
                  placeholder={t('customerScreen.drawer.email')}
                />
                <Error errorName={errors.email} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('customerScreen.drawer.phone')} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Phone"
                  name="phone"
                  type="text"
                  placeholder={t('customerScreen.drawer.phone')}
                />
                <Error errorName={errors.phone} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('customerScreen.drawer.address')} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Address"
                  name="address"
                  type="text"
                  placeholder={t('customerScreen.drawer.address')}
                />
                <Error errorName={errors.address} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title={t('customerScreen.singularTitle')} isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  )
}

export default CustomerDrawer
