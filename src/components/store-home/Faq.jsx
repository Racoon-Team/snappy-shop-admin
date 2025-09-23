import { Button } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'
import { FiSettings } from 'react-icons/fi'

//internal import

import Error from '@/components/form/others/Error'
import spinnerLoadingImage from '@/assets/img/spinner.gif'
import InputAreaTwo from '@/components/form/input/InputAreaTwo'
import SwitchToggle from '@/components/form/switch/SwitchToggle'
import TextAreaCom from '@/components/form/others/TextAreaCom'
import Uploader from '@/components/image-uploader/Uploader'

const Faq = ({
  isSave,
  errors,
  register,
  setFaqStatus,
  faqStatus,
  setFaqHeaderBg,
  faqHeaderBg,
  setFaqLeftColImage,
  faqLeftColImage,
  setFaqLeftColStatus,
  faqLeftColStatus,
  setFaqRightColStatus,
  faqRightColStatus,
  isSubmitting,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="col-span-12 md:col-span-12 lg:col-span-12 mr-3 ">
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

        <div className="inline-flex text-lg text-gray-800 font-semibold dark:text-gray-400 md:mb-3 mb-1">
          <FiSettings className="mt-1 mr-2" />
          {t('storeCustomizationScreen.faQs.title')}
        </div>
        <hr className="md:mb-10 mb-3" />

        <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full pb-0">
          <div className="inline-flex md:text-md text-sm mb-3 text-gray-500 dark:text-gray-400">
            <strong>{t('storeCustomizationScreen.faQs.subTitle.titleFaQs')}</strong>
          </div>
          <hr className="md:mb-12 mb-3" />

          <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t('common.enableThisBlock')}
            </label>
            <div className="sm:col-span-4">
              <SwitchToggle title="" handleProcess={setFaqStatus} processOption={faqStatus} name={faqStatus} />
            </div>
          </div>

          <div
            className="mb-height-0"
            style={{
              height: faqStatus ? 'auto' : 0,
              transition: 'all 0.5s',
              visibility: !faqStatus ? 'hidden' : 'visible',
              opacity: !faqStatus ? '0' : '1',
            }}
          >
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('common.pageHeaderBg')}
              </label>
              <div className="sm:col-span-4">
                <Uploader imageUrl={faqHeaderBg} setImageUrl={setFaqHeaderBg} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('common.pageTitle')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="Page Title"
                  name="faq_page_title"
                  type="text"
                  placeholder={t('common.pageTitle')}
                />
                <Error errorName={errors.faq_page_title} />
              </div>
            </div>
          </div>

          <div className="inline-flex md:text-md text-sm mb-3 text-gray-500 dark:text-gray-400">
            <strong>{t('storeCustomizationScreen.faQs.LeftColumn.faqLeftCol')}</strong>
          </div>
          <hr className="md:mb-12 mb-3" />

          <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t('common.enableThisBlock')}
            </label>
            <div className="sm:col-span-4">
              <SwitchToggle
                title=""
                handleProcess={setFaqLeftColStatus}
                processOption={faqLeftColStatus}
                name={faqLeftColStatus}
              />
            </div>
          </div>

          <div
            style={{
              height: faqLeftColStatus ? 'auto' : 0,
              transition: 'all 0.5s',
              visibility: !faqLeftColStatus ? 'hidden' : 'visible',
              opacity: !faqLeftColStatus ? '0' : '1',
            }}
            className="mb-height-0 grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative"
          >
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t('storeCustomizationScreen.faQs.LeftColumn.leftImage')}
            </label>
            <div className="sm:col-span-4">
              <Uploader imageUrl={faqLeftColImage} setImageUrl={setFaqLeftColImage} />
            </div>
          </div>

          <div className="inline-flex md:text-md text-sm mb-3 text-gray-500 dark:text-gray-400">
            <strong>{t('storeCustomizationScreen.tabsSettings.faq')}</strong>
          </div>
          <hr className="md:mb-12 mb-3" />

          <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t('common.enableThisBlock')}
            </label>
            <div className="sm:col-span-4">
              <SwitchToggle
                title=""
                handleProcess={setFaqRightColStatus}
                processOption={faqRightColStatus}
                name={faqRightColStatus}
              />
            </div>
          </div>

          <div
            style={{
              height: faqRightColStatus ? 'auto' : 0,
              transition: 'all 0.5s',
              visibility: !faqRightColStatus ? 'hidden' : 'visible',
              opacity: !faqRightColStatus ? '0' : '1',
            }}
          >
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.faQs.LeftColumn.faqTitleOne')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="FAQ Title"
                  name="faq_title_one"
                  type="text"
                  placeholder={t('storeCustomizationScreen.faQs.LeftColumn.title')}
                />
                <Error errorName={errors.faq_title_one} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.faQs.LeftColumn.faqDescriptionOne')}
              </label>
              <div className="sm:col-span-4">
                <TextAreaCom
                  register={register}
                  label="Faq Description"
                  name="faq_description_one"
                  type="text"
                  placeholder={t('storeCustomizationScreen.faQs.LeftColumn.faqDescriptionOne')}
                />
                <Error errorName={errors.faq_description_one} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.faQs.LeftColumn.faqTitleTwo')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="FAQ Title"
                  name="faq_title_two"
                  type="text"
                  placeholder={t('storeCustomizationScreen.faQs.LeftColumn.faqTitleTwo')}
                />
                <Error errorName={errors.faq_title_two} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.faQs.LeftColumn.faqDescriptionTwo')}
              </label>
              <div className="sm:col-span-4">
                <TextAreaCom
                  register={register}
                  label="Faq Description"
                  name="faq_description_two"
                  type="text"
                  placeholder={t('storeCustomizationScreen.faQs.LeftColumn.faqDescriptionTwo')}
                />
                <Error errorName={errors.faq_description_two} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.faQs.LeftColumn.faqTitleThree')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="FAQ Title"
                  name="faq_title_three"
                  type="text"
                  placeholder={t('storeCustomizationScreen.faQs.LeftColumn.faqTitleThree')}
                />
                <Error errorName={errors.faq_title_three} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.faQs.LeftColumn.faqDescriptionThree')}
              </label>
              <div className="sm:col-span-4">
                <TextAreaCom
                  register={register}
                  label="Faq Description"
                  name="faq_description_three"
                  type="text"
                  placeholder={t('storeCustomizationScreen.faQs.LeftColumn.faqDescriptionThree')}
                />
                <Error errorName={errors.faq_description_three} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.faQs.LeftColumn.faqTitleFour')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="FAQ Title"
                  name="faq_title_four"
                  type="text"
                  placeholder={t('storeCustomizationScreen.faQs.LeftColumn.faqTitleFour')}
                />
                <Error errorName={errors.faq_title_four} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.faQs.LeftColumn.faqDescriptionFour')}
              </label>
              <div className="sm:col-span-4">
                <TextAreaCom
                  register={register}
                  label="Faq Description"
                  name="faq_description_four"
                  type="text"
                  placeholder={t('storeCustomizationScreen.faQs.LeftColumn.faqDescriptionFour')}
                />
                <Error errorName={errors.faq_description_four} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.faQs.LeftColumn.faqTitleFive')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="FAQ Title"
                  name="faq_title_five"
                  type="text"
                  placeholder={t('storeCustomizationScreen.faQs.LeftColumn.faqTitleFive')}
                />
                <Error errorName={errors.faq_title_five} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.faQs.LeftColumn.faqDescriptionFive')}
              </label>
              <div className="sm:col-span-4">
                <TextAreaCom
                  register={register}
                  label="Faq Description"
                  name="faq_description_five"
                  type="text"
                  placeholder={t('storeCustomizationScreen.faQs.LeftColumn.faqDescriptionFive')}
                />
                <Error errorName={errors.faq_description_five} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.faQs.LeftColumn.faqTitleSix')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="FAQ Title"
                  name="faq_title_six"
                  type="text"
                  placeholder={t('storeCustomizationScreen.faQs.LeftColumn.faqTitleSix')}
                />
                <Error errorName={errors.faq_title_six} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.faQs.LeftColumn.faqDescriptionSix')}
              </label>
              <div className="sm:col-span-4">
                <TextAreaCom
                  register={register}
                  label="Faq Description"
                  name="faq_description_six"
                  type="text"
                  placeholder={t('storeCustomizationScreen.faQs.LeftColumn.faqDescriptionSix')}
                />
                <Error errorName={errors.faq_description_six} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.faQs.LeftColumn.faqTitleSeven')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="FAQ Title"
                  name="faq_title_seven"
                  type="text"
                  placeholder={t('storeCustomizationScreen.faQs.LeftColumn.faqTitleSeven')}
                />
                <Error errorName={errors.faq_title_seven} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.faQs.LeftColumn.faqDescriptionSeven')}
              </label>
              <div className="sm:col-span-4">
                <TextAreaCom
                  register={register}
                  label="Faq Description"
                  name="faq_description_seven"
                  type="text"
                  placeholder={t('storeCustomizationScreen.faQs.LeftColumn.faqDescriptionSeven')}
                />
                <Error errorName={errors.faq_description_seven} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.faQs.LeftColumn.faqTitleEight')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="FAQ Title"
                  name="faq_title_eight"
                  type="text"
                  placeholder={t('storeCustomizationScreen.faQs.LeftColumn.faqTitleEight')}
                />
                <Error errorName={errors.faq_title_eight} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.faQs.LeftColumn.faqDescriptionEight')}
              </label>
              <div className="sm:col-span-4">
                <TextAreaCom
                  register={register}
                  label="Faq Description"
                  name="faq_description_eight"
                  type="text"
                  placeholder={t('storeCustomizationScreen.faQs.LeftColumn.faqDescriptionEight')}
                />
                <Error errorName={errors.faq_description_eight} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Faq
