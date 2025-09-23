import { t } from 'i18next'
import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

//internal import
import Title from '@/components/form/others/Title'
import Error from '@/components/form/others/Error'
import InputArea from '@/components/form/input/InputArea'
import LabelArea from '@/components/form/selectOption/LabelArea'
import SwitchToggle from '@/components/form/switch/SwitchToggle'
import DrawerButton from '@/components/form/button/DrawerButton'
import useCurrencySubmit from '@/hooks/useCurrencySubmit'

//internal import

const CurrencyDrawer = ({ id }) => {
  const { errors, onSubmit, register, status, setStatus, isSubmitting, handleSubmit } = useCurrencySubmit(id)

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={t('currenciesScreen.drawer.updateCurrency')}
            description={t('currenciesScreen.drawer.currencyText')}
          />
        ) : (
          <Title
            title={t('currenciesScreen.drawer.addCurrency')}
            description={t('currenciesScreen.drawer.descriptionCurrency')}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('currenciesScreen.drawer.name')} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label={t('currenciesScreen.drawer.name')}
                  name="name"
                  type="text"
                  placeholder={t('currenciesScreen.drawer.name')}
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('currenciesScreen.drawer.symbol')} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label={t('currenciesScreen.drawer.symbol')}
                  name="symbol"
                  type="text"
                  placeholder={t('currenciesScreen.drawer.symbol')}
                />
                <Error errorName={errors.symbol} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('currenciesScreen.drawer.enabled')} />
              <div className="col-span-8 sm:col-span-1 text-align-left">
                <SwitchToggle processOption={status} handleProcess={setStatus} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title={t('currenciesScreen.drawer.currency')} isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  )
}

export default CurrencyDrawer
