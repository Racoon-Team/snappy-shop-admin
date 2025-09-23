import { Button } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'
import { FiSettings } from 'react-icons/fi'

//internal import

import Error from '@/components/form/others/Error'
import spinnerLoadingImage from '@/assets/img/spinner.gif'
import InputAreaTwo from '@/components/form/input/InputAreaTwo'

const DashboardSetting = ({ isSave, errors, register, isSubmitting }) => {
  const { t } = useTranslation()

  return (
    <div className="col-span-12 md:col-span-12 lg:col-span-12 pr-3">
      <div className="sticky top-0 z-20 flex justify-end">
        {isSubmitting ? (
          <Button disabled={true} type="button" className="h-10 px-6">
            <img src={spinnerLoadingImage} alt="Loading" width={20} height={10} />{' '}
            <span className="font-serif ml-2 font-light"> {t('Processing')}</span>
          </Button>
        ) : (
          <Button type="submit" className="h-10 px-6 ">
            {' '}
            {isSave ? t('common.saveBtn') : t('common.updateBtn')}
          </Button>
        )}
      </div>

      <div className="inline-flex md:text-lg text-md text-gray-800 font-semibold dark:text-gray-400 md:mb-3 mb-1">
        <FiSettings className="mt-1 mr-2" />
        {t('storeCustomizationScreen.dashboardSetting.title')}
      </div>
      <hr className="md:mb-12 mb-3" />

      <div className="flex justify-between md:text-base text-sm mb-3  dark:text-gray-400 relative">
        <div className="w-full text-gray-500">
          <strong>{t('storeCustomizationScreen.dashboardSetting.subTitle.dashboard')}</strong>
        </div>
      </div>

      <hr className="md:mb-8 mb-3" />
      <div className="grid grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.subTitle.invoiceMessage1st')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('InvoiceMessage1st')}
            name="invoice_message_first"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.subTitle.invoiceMessage1st')}
          />
          <Error errorName={errors.invoice_message_first} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.subTitle.invoiceMessage2nd')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('InvoiceMessage2nd')}
            name="invoice_message_last"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.subTitle.invoiceMessage2nd')}
          />
          <Error errorName={errors.invoice_message_last} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.subTitle.printButton')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('PrintButton')}
            name="print_button"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.subTitle.printButton')}
          />
          <Error errorName={errors.print_button} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.subTitle.downloadButton')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('DownloadButton')}
            name="download_button"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.subTitle.downloadButton')}
          />
          <Error errorName={errors.download_button} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.subTitle.dashboard')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('Dashboard')}
            name="dashboard_title"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.subTitle.dashboard')}
          />
          <Error errorName={errors.dashboard_title} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.subTitle.totalOrder')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('TotalOrder')}
            name="total_order"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.subTitle.totalOrder')}
          />
          <Error errorName={errors.total_order} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.subTitle.pendingOrder')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('PendingOrder')}
            name="pending_order"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.subTitle.pendingOrder')}
          />
          <Error errorName={errors.pending_order} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.subTitle.processingOrder')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('ProcessingOrder')}
            name="processing_order"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.subTitle.processingOrder')}
          />
          <Error errorName={errors.processing_order} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.subTitle.completeOrder')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('CompleteOrder')}
            name="complete_order"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.subTitle.completeOrder')}
          />
          <Error errorName={errors.complete_order} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.subTitle.recentOrder')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('RecentOrder')}
            name="recent_order"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.subTitle.recentOrder')}
          />
          <Error errorName={errors.recent_order} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.subTitle.myOrder')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('MyOrder')}
            name="my_order"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.subTitle.myOrder')}
          />
          <Error errorName={errors.my_order} />
        </div>
      </div>

      <div className="flex justify-between md:text-base text-sm mb-3 mt-12 dark:text-gray-400 relative">
        <div className="w-full text-gray-500">
          <strong>{t('storeCustomizationScreen.dashboardSetting.updateProfile.title')}</strong>
        </div>
        <div className="w-full">
          <InputAreaTwo
            register={register}
            label={t('UpdateProfile')}
            name="update_profile"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.updateProfile.title')}
          />
          <Error errorName={errors.update_profile} />
        </div>
      </div>

      <hr className="md:mb-8 mb-3" />
      <div className="grid grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.updateProfile.fullName')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('FullName')}
            name="full_name"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.updateProfile.fullName')}
          />
          <Error errorName={errors.full_name} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.updateProfile.userAddress')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('UserAddress')}
            name="address"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.updateProfile.userAddress')}
          />
          <Error errorName={errors.address} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.updateProfile.phoneMobile')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('PhoneMobile')}
            name="user_phone"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.updateProfile.phoneMobile')}
          />
          <Error errorName={errors.user_phone} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.updateProfile.emailAddress')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('EmailAddress')}
            name="user_email"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.updateProfile.emailAddress')}
          />
          <Error errorName={errors.user_email} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.updateProfile.updateButton')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('UpdateButton')}
            name="update_button"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.updateProfile.updateButton')}
          />
          <Error errorName={errors.update_button} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.updateProfile.currentPassword')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('CurrentPassword')}
            name="current_password"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.updateProfile.currentPassword')}
          />
          <Error errorName={errors.current_password} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.updateProfile.newPassword')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('NewPassword')}
            name="new_password"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.updateProfile.newPassword')}
          />
          <Error errorName={errors.new_password} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t('storeCustomizationScreen.dashboardSetting.updateProfile.changePassword')}
          </label>
          <InputAreaTwo
            register={register}
            label={t('ChangePassword')}
            name="change_password"
            type="text"
            placeholder={t('storeCustomizationScreen.dashboardSetting.updateProfile.changePassword')}
          />
          <Error errorName={errors.change_password} />
        </div>
      </div>
    </div>
  )
}

export default DashboardSetting
