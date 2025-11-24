import { Input } from '@windmill/react-ui'
import { t } from 'i18next'
import { Scrollbars } from 'react-custom-scrollbars-2'

//internal import
import Title from '@/components/form/others/Title'
import Error from '@/components/form/others/Error'
import InputArea from '@/components/form/input/InputArea'
import InputValue from '@/components/form/input/InputValue'
import LabelArea from '@/components/form/selectOption/LabelArea'
import Uploader from '@/components/image-uploader/Uploader'
import useCouponSubmit from '@/hooks/useCouponSubmit'
import DrawerButton from '@/components/form/button/DrawerButton'
import SwitchToggle from '@/components/form/switch/SwitchToggle'
import SwitchToggleFour from '@/components/form/switch/SwitchToggleFour'

const CouponDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setImageUrl,
    imageUrl,
    published,
    setPublished,
    currency,
    discountType,
    setDiscountType,
    isSubmitting,
    handleSelectLanguage,
  } = useCouponSubmit(id)

  return (
    <>
      <div className="w-full relative  p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t('couponsScreen.couponDrawer.titleUpdate')}
            description={t('couponsScreen.couponDrawer.descriptionUpdate')}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t('couponsScreen.couponDrawer.titleAdd')}
            description={t('couponsScreen.couponDrawer.descriptionAdd')}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('couponsScreen.couponDrawer.couponBannerImage')} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  folder="coupon"
                  targetWidth={238}
                  targetHeight={238}
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('couponsScreen.couponDrawer.campaignName')} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label={t('couponsScreen.couponDrawer.campaignName')}
                  name="title"
                  type="text"
                  placeholder={t('couponsScreen.couponDrawer.campaignName')}
                />
                <Error errorName={errors.title} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('couponsScreen.couponDrawer.campaignCode')} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label={t('couponsScreen.couponDrawer.campaignCode')}
                  name="couponCode"
                  type="text"
                  placeholder={t('couponsScreen.couponDrawer.campaignCode')}
                />
                <Error errorName={errors.couponCode} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('couponsScreen.couponDrawer.couponValidityTime')} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register(`endTime`, {
                    required: t('couponsScreen.couponDrawer.validationEnd'),
                  })}
                  label="Coupon Validation End Time"
                  name="endTime"
                  type="datetime-local"
                  placeholder={t('CouponValidityTime')}
                />

                <Error errorName={errors.endTime} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('couponsScreen.couponDrawer.discountType')} />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggleFour handleProcess={setDiscountType} processOption={discountType} />
                <Error errorName={errors.discountType} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('couponsScreen.couponDrawer.couponDiscount')} />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  product
                  required={true}
                  register={register}
                  maxValue={discountType ? 99 : 1000}
                  minValue={1}
                  label={t('couponsScreen.couponDrawer.validationDiscount')}
                  name="discountPercentage"
                  type="number"
                  placeholder={
                    discountType
                      ? t('couponsScreen.couponDrawer.inputFixed')
                      : t('couponsScreen.couponDrawer.inputPercentaje')
                  }
                  currency={discountType ? '%' : currency}
                />

                <Error errorName={errors.discountPercentage} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('couponsScreen.couponDrawer.minimumAmount')} />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  product
                  required={true}
                  register={register}
                  maxValue={200000}
                  minValue={10}
                  label={t('couponsScreen.couponDrawer.minimumAmount')}
                  name="minimumAmount"
                  type="number"
                  placeholder={t('couponsScreen.couponDrawer.inputMinimumAmount')}
                  currency={currency}
                />
                <Error errorName={errors.minimumAmount} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('couponsScreen.couponDrawer.labelPublished')} />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggle handleProcess={setPublished} processOption={published} />
                <Error errorName={errors.productType} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title={t('couponsScreen.title')} isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  )
}

export default CouponDrawer
