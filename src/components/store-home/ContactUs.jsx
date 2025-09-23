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

const ContactUs = ({
  isSave,
  errors,
  register,
  setContactPageHeader,
  contactPageHeader,
  setContactHeaderBg,
  contactHeaderBg,
  setEmailUsBox,
  emailUsBox,
  setCallUsBox,
  callUsBox,
  setAddressBox,
  addressBox,
  setContactMidLeftColStatus,
  contactMidLeftColStatus,
  setContactMidLeftColImage,
  contactMidLeftColImage,
  setContactFormStatus,
  contactFormStatus,
  isSubmitting,
}) => {
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
          {t('storeCustomizationScreen.contactUs.title')}
        </div>
        <hr className="md:mb-12 mb-3" />

        <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full">
          <div className="inline-flex md:text-md text-sm mb-3 text-gray-500 dark:text-gray-400">
            <strong>{t('storeCustomizationScreen.contactUs.pageHeader.title')}</strong>
          </div>
          <hr className="md:mb-12 mb-3" />

          <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t('common.storeCustomizations.labelEnableThisBlock')}
            </label>
            <div className=" sm:col-span-4">
              <SwitchToggle
                title=""
                handleProcess={setContactPageHeader}
                processOption={contactPageHeader}
                name={contactPageHeader}
              />
            </div>
          </div>

          <div
            className="mb-height-0"
            style={{
              height: contactPageHeader ? 'auto' : 0,
              transition: 'all 0.5s',
              visibility: !contactPageHeader ? 'hidden' : 'visible',
              opacity: !contactPageHeader ? '0' : '1',
            }}
          >
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.contactUs.pageHeader.labelBackground')}
              </label>
              <div className=" sm:col-span-4">
                <Uploader imageUrl={contactHeaderBg} setImageUrl={setContactHeaderBg} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.contactUs.pageHeader.labelPageTitle')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label={t('storeCustomizationScreen.contactUs.pageHeader.labelPageTitle')}
                  name="contact_page_title"
                  type="text"
                  placeholder={t('storeCustomizationScreen.contactUs.pageHeader.inputPageTitle')}
                />
                <Error errorName={errors.contact_page_title} />
              </div>
            </div>
          </div>

          <div className="inline-flex md:text-md text-sm mb-3 text-gray-500 dark:text-gray-400 relative">
            <strong>{t('storeCustomizationScreen.contactUs.emailUsBox.title')}</strong>
          </div>
          <hr className="md:mb-12 mb-3" />
          <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t('common.storeCustomizations.labelEnableThisBlock')}
            </label>
            <div className=" sm:col-span-4">
              <SwitchToggle title="" handleProcess={setEmailUsBox} processOption={emailUsBox} name={emailUsBox} />
            </div>
          </div>

          <div
            className="mb-height-0"
            style={{
              height: emailUsBox ? 'auto' : 0,
              transition: 'all 0.5s',
              visibility: !emailUsBox ? 'hidden' : 'visible',
              opacity: !emailUsBox ? '0' : '1',
            }}
          >
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('common.storeCustomizations.labelTitle')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label={t('common.storeCustomizations.labelTitle')}
                  name="email_box_title"
                  type="text"
                  placeholder={t('common.storeCustomizations.inputTitle')}
                />
                <Error errorName={errors.email_box_title} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.contactUs.emailUsBox.labelEmail')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label={t('storeCustomizationScreen.contactUs.emailUsBox.labelEmail')}
                  name="email_box_email"
                  type="text"
                  placeholder={t('storeCustomizationScreen.contactUs.emailUsBox.inputEmail')}
                />
                <Error errorName={errors.email_box_email} />
              </div>
            </div>
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.contactUs.emailUsBox.labelText')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label={t('storeCustomizationScreen.contactUs.emailUsBox.labelText')}
                  name="email_box_text"
                  type="text"
                  placeholder={t('storeCustomizationScreen.contactUs.emailUsBox.inputText')}
                />
                <Error errorName={errors.email_box_text} />
              </div>
            </div>
          </div>

          <div className="inline-flex md:text-md text-sm mb-3 text-gray-500 dark:text-gray-400 relative">
            <strong>{t('storeCustomizationScreen.contactUs.callUsBox.title')}</strong>
          </div>
          <hr className="md:mb-12 mb-3" />

          <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t('common.storeCustomizations.labelEnableThisBlock')}
            </label>
            <div className=" sm:col-span-4">
              <SwitchToggle title="" handleProcess={setCallUsBox} processOption={callUsBox} name={callUsBox} />
            </div>
          </div>

          <div
            className="mb-height-0"
            style={{
              height: callUsBox ? 'auto' : 0,
              transition: 'all 0.5s',
              visibility: !callUsBox ? 'hidden' : 'visible',
              opacity: !callUsBox ? '0' : '1',
            }}
          >
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('common.storeCustomizations.labelTitle')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label={t('common.storeCustomizations.labelTitle')}
                  name="callUs_box_title"
                  type="text"
                  placeholder={t('common.storeCustomizations.inputTitle')}
                />
                <Error errorName={errors.callUs_box_title} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.contactUs.callUsBox.labelPhone')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label={t('storeCustomizationScreen.contactUs.callUsBox.labelPhone')}
                  name="callUs_box_phone"
                  type="text"
                  placeholder={t('storeCustomizationScreen.contactUs.callUsBox.inputPhone')}
                />
                <Error errorName={errors.callUs_box_phone} />
              </div>
            </div>
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.contactUs.callUsBox.labelText')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label={t('storeCustomizationScreen.contactUs.callUsBox.labelText')}
                  name="callUs_box_text"
                  type="text"
                  placeholder={t('storeCustomizationScreen.contactUs.callUsBox.inputText')}
                />
                <Error errorName={errors.callUs_box_text} />
              </div>
            </div>
          </div>

          <div className="inline-flex md:text-md text-sm mb-3 text-gray-500 dark:text-gray-400 relative">
            <strong>{t('storeCustomizationScreen.contactUs.addressBox.title')}</strong>
          </div>
          <hr className="md:mb-12 mb-3" />

          <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t('common.storeCustomizations.labelEnableThisBlock')}
            </label>
            <div className=" sm:col-span-4">
              <SwitchToggle title="" handleProcess={setAddressBox} processOption={addressBox} name={addressBox} />
            </div>
          </div>

          <div
            className="mb-height-0"
            style={{
              height: addressBox ? 'auto' : 0,
              transition: 'all 0.5s',
              visibility: !addressBox ? 'hidden' : 'visible',
              opacity: !addressBox ? '0' : '1',
            }}
          >
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('common.storeCustomizations.labelTitle')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label={t('common.storeCustomizations.labelTitle')}
                  name="address_box_title"
                  type="text"
                  placeholder={t('common.storeCustomizations.inputTitle')}
                />
                <Error errorName={errors.address_box_title} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.contactUs.addressBox.labelAddressOne')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label={t('storeCustomizationScreen.contactUs.addressBox.labelAddressOne')}
                  name="address_box_address_one"
                  type="text"
                  placeholder={t('storeCustomizationScreen.contactUs.addressBox.inputAddressOne')}
                />
                <Error errorName={errors.address_box_address_one} />
              </div>
            </div>
          </div>

          <div className="inline-flex md:text-md text-sm mb-3 text-gray-500 dark:text-gray-400">
            <strong>{t('storeCustomizationScreen.contactUs.middleLeftColum.title')}</strong>
          </div>
          <hr className="md:mb-12 mb-3" />

          <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t('common.storeCustomizations.labelEnableThisBlock')}
            </label>
            <div className=" sm:col-span-4">
              <SwitchToggle
                title=""
                handleProcess={setContactMidLeftColStatus}
                processOption={contactMidLeftColStatus}
                name={contactMidLeftColStatus}
              />
            </div>
          </div>

          <div
            className="mb-height-0"
            style={{
              height: contactMidLeftColStatus ? 'auto' : 0,
              transition: 'all 0.5s',
              visibility: !contactMidLeftColStatus ? 'hidden' : 'visible',
              opacity: !contactMidLeftColStatus ? '0' : '1',
            }}
          >
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.contactUs.middleLeftColum.labelImage')}
              </label>
              <div className=" sm:col-span-4">
                <Uploader
                  imageUrl={contactMidLeftColImage}
                  setImageUrl={setContactMidLeftColImage}
                  targetWidth={874}
                  targetHeight={877}
                />
              </div>
            </div>
          </div>

          <div className="inline-flex md:text-md text-sm mb-3 text-gray-500 dark:text-gray-400 relative">
            <strong>{t('storeCustomizationScreen.contactUs.contactForm.title')}</strong>
          </div>
          <hr className="md:mb-12 mb-3" />

          <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t('common.storeCustomizations.labelEnableThisBlock')}
            </label>
            <div className=" sm:col-span-4">
              <SwitchToggle
                title=""
                handleProcess={setContactFormStatus}
                processOption={contactFormStatus}
                name={contactFormStatus}
              />
            </div>
          </div>

          <div
            className="mb-height-0"
            style={{
              height: contactFormStatus ? 'auto' : 0,
              transition: 'all 0.5s',
              visibility: !contactFormStatus ? 'hidden' : 'visible',
              opacity: !contactFormStatus ? '0' : '1',
            }}
          >
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.contactUs.contactForm.labelTitle')}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label={t('storeCustomizationScreen.contactUs.contactForm.labelTitle')}
                  name="contact_form_title"
                  type="text"
                  placeholder={t('storeCustomizationScreen.contactUs.contactForm.inputTitle')}
                />
                <Error errorName={errors.contact_form_title} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.contactUs.contactForm.labelDescription')}
              </label>
              <div className="sm:col-span-4">
                <TextAreaCom
                  register={register}
                  label={t('storeCustomizationScreen.contactUs.contactForm.labelDescription')}
                  name="contact_form_description"
                  type="text"
                  placeholder={t('storeCustomizationScreen.contactUs.contactForm.inputDescription')}
                />
                <Error errorName={errors.contact_form_description} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs
