import { Button } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'
import { FiSettings } from 'react-icons/fi'

//internal import

import Error from '@/components/form/others/Error'
import spinnerLoadingImage from '@/assets/img/spinner.gif'
import InputAreaTwo from '@/components/form/input/InputAreaTwo'

const Checkout = ({ isSave, errors, register, isSubmitting }) => {
  const { t } = useTranslation()
  return (
    <>
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
          {t('storeCustomizationScreen.checkOut.title')}
        </div>
        <hr className="md:mb-12 mb-3" />

        <div className="flex justify-between md:text-base text-sm mb-3  dark:text-gray-400 relative">
          <div className="w-full text-gray-500">
            <strong>{t('storeCustomizationScreen.checkOut.personalDetails.titleInfo')}</strong>
          </div>
          <div className="w-full">
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.personalDetails.titleInfo')}
              name="personal_details"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.personalDetails.inputInfo')}
            />
            <Error errorName={errors.personal_details} />
          </div>
        </div>

        <hr className="md:mb-8 mb-3" />
        <div className="grid grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.personalDetails.labelFirstName')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.personalDetails.labelFirstName')}
              name="first_name"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.personalDetails.inputFirstName')}
            />
            <Error errorName={errors.first_name} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.personalDetails.labelMiddleName')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.personalDetails.labelMiddleName')}
              name="first_name"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.personalDetails.inputMiddleName')}
            />
            <Error errorName={errors.first_name} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.personalDetails.labelLastName')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.personalDetails.labelLastName')}
              name="last_name"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.personalDetails.inputLastName')}
            />
            <Error errorName={errors.last_name} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.personalDetails.labelEmailAddress')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.personalDetails.labelEmailAddress')}
              name="email_address"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.personalDetails.inputEmailAddress')}
            />
            <Error errorName={errors.email_address} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.personalDetails.labelPhone')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.personalDetails.labelPhone')}
              name="checkout_phone"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.personalDetails.inputPhone')}
            />
            <Error errorName={errors.checkout_phone} />
          </div>
        </div>

        <div className="flex justify-between md:text-base text-sm mb-3 mt-12 dark:text-gray-400 relative">
          <div className="w-full text-gray-500">
            <strong>{t('storeCustomizationScreen.checkOut.shippingDetails.titleInfo')}</strong>
          </div>
          <div className="w-full">
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.shippingDetails.titleInfo')}
              name="shipping_details"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.shippingDetails.inputInfo')}
            />
            <Error errorName={errors.shipping_details} />
          </div>
        </div>

        <hr className="md:mb-8 mb-3" />
        <div className="grid grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.shippingDetails.labelStreetAddress')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.shippingDetails.labelStreetAddress')}
              name="street_address"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.shippingDetails.inputStreetAddress')}
            />
            <Error errorName={errors.street_address} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.shippingDetails.labelCity')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.shippingDetails.labelCity')}
              name="city"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.shippingDetails.inputCity')}
            />
            <Error errorName={errors.city} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.shippingDetails.labelCountry')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.shippingDetails.labelCountry')}
              name="country"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.shippingDetails.inputCountry')}
            />
            <Error errorName={errors.country} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.shippingDetails.labelZipCode')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.shippingDetails.labelZipCode')}
              name="zip_code"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.shippingDetails.inputZipCode')}
            />
            <Error errorName={errors.zip_code} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.shippingDetails.labelCost')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.shippingDetails.labelCost')}
              name="shipping_cost"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.shippingDetails.inputCost')}
            />
            <Error errorName={errors.shipping_cost} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.shippingDetails.labelNameOne')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.shippingDetails.labelNameOne')}
              name="shipping_name_one"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.shippingDetails.inputNameOne')}
            />
            <Error errorName={errors.shipping_name_one} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.shippingDetails.labelOneDescription')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.shippingDetails.labelOneDescription')}
              name="shipping_one_desc"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.shippingDetails.inputOneDescription')}
            />
            <Error errorName={errors.shipping_one_desc} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.shippingDetails.labelOneCost')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.shippingDetails.labelOneCost')}
              name="shipping_one_cost"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.shippingDetails.inputOneCost')}
            />
            <Error errorName={errors.shipping_one_cost} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.shippingDetails.labelNameTwo')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.shippingDetails.labelNameTwo')}
              name="shipping_name_two"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.shippingDetails.inputNameTwo')}
            />
            <Error errorName={errors.shipping_name_two} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.shippingDetails.labelTwoDescription')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.shippingDetails.labelTwoDescription')}
              name="shipping_two_desc"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.shippingDetails.inputTwoDescription')}
            />
            <Error errorName={errors.shipping_two_desc} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.shippingDetails.labelTwoCost')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.shippingDetails.labelTwoCost')}
              name="shipping_two_cost"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.shippingDetails.inputTwoCost')}
            />
            <Error errorName={errors.shipping_two_cost} />
          </div>

          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.shippingDetails.labelpaymentMethod')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.shippingDetails.labelpaymentMethod')}
              name="payment_method"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.shippingDetails.inputpaymentMethod')}
            />
            <Error errorName={errors.payment_method} />
          </div>

          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.shippingDetails.labelContinueButton')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.shippingDetails.labelContinueButton')}
              name="continue_button"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.shippingDetails.inputContinueButton')}
            />
            <Error errorName={errors.continue_button} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.shippingDetails.labelConfirmButton')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.shippingDetails.labelConfirmButton')}
              name="confirm_button"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.shippingDetails.inputConfirmButton')}
            />
            <Error errorName={errors.confirm_button} />
          </div>
        </div>
        <div className="inline-flex md:text-base text-sm mb-3 text-gray-500 dark:text-gray-400 relative">
          <strong>{t('storeCustomizationScreen.checkOut.cartItemSection.title')}</strong>
        </div>

        <hr className="md:mb-8 mb-3" />
        <div className="grid grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.cartItemSection.labelOrderSummary')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.cartItemSection.labelOrderSummary')}
              name="order_summary"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.cartItemSection.inputOrderSummary')}
            />
            <Error errorName={errors.order_summary} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.cartItemSection.labelApplyButton')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.cartItemSection.labelApplyButton')}
              name="apply_button"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.cartItemSection.inputApplyButton')}
            />
            <Error errorName={errors.apply_button} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.cartItemSection.labelSubtotal')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.cartItemSection.labelSubtotal')}
              name="sub_total"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.cartItemSection.inputSubtotal')}
            />
            <Error errorName={errors.sub_total} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.cartItemSection.labelDiscountLower')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.cartItemSection.labelDiscountLower')}
              name="discount"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.cartItemSection.inputDiscountLower')}
            />
            <Error errorName={errors.discount} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t('storeCustomizationScreen.checkOut.cartItemSection.labelTotalCost')}
            </label>
            <InputAreaTwo
              register={register}
              label={t('storeCustomizationScreen.checkOut.cartItemSection.labelTotalCost')}
              name="total_cost"
              type="text"
              placeholder={t('storeCustomizationScreen.checkOut.cartItemSection.inputTotalCost')}
            />
            <Error errorName={errors.total_cost} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
