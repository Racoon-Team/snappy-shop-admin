import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

//internal import
import Label from '@/components/form/label/Label'
import Error from '@/components/form/others/Error'
import PageTitle from '@/components/Typography/PageTitle'
import InputAreaTwo from '@/components/form/input/InputAreaTwo'
import SwitchToggle from '@/components/form/switch/SwitchToggle'
import useStoreSettingSubmit from '@/hooks/useStoreSettingSubmit'
import AnimatedContent from '@/components/common/AnimatedContent'
import SettingContainer from '@/components/settings/SettingContainer'
import React, { useState } from 'react'
const StoreSetting = () => {
  const { t } = useTranslation()
  const [provinceInput, setProvinceInput] = useState('')

  const { provinces, setProvinces } = useStoreSettingSubmit()

  const handleProvinceKeyDown = (e) => {
    if (e.key === 'Enter' && provinceInput.trim()) {
      e.preventDefault()
      const newProvince = {
        key: uuidv4(),
        label: provinceInput.trim(),
      }
      setProvinces([...provinces, newProvince])
      setProvinceInput('')
    }
  }

  const removeProvince = (provinceToRemove) => {
    setProvinces(provinces.filter((p) => p.key !== provinceToRemove.key))
  }

  const {
    isSave,
    errors,
    register,
    onSubmit,
    handleSubmit,
    isSubmitting,
    enabledCOD,
    setEnabledCOD,
    enabledQR,
    setEnabledQR,
    enabledStripe,
    setEnabledStripe,
    enabledRazorPay,
    setEnabledRazorPay,
    enabledFbPixel,
    setEnableFbPixel,
    enabledTawkChat,
    setEnabledTawkChat,
    enabledGoogleLogin,
    setEnabledGoogleLogin,
    enabledGithubLogin,
    setEnabledGithubLogin,
    enabledFacebookLogin,
    setEnabledFacebookLogin,
    enabledGoogleAnalytics,
    setEnabledGoogleAnalytics,
  } = useStoreSettingSubmit()

  const handleEnableDisableMethod = (checked, event, id) => {
    if (id === 'stripe' && !checked) {
      setEnabledStripe(false)
      if (!enabledCOD && !enabledQR) setEnabledCOD(true)
    } else if (id === 'stripe' && checked) {
      setEnabledStripe(true)
    } else if (id === 'cod' && !checked) {
      setEnabledCOD(false)
      if (!enabledStripe && !enabledQR) setEnabledStripe(true)
    } else if (id === 'cod' && checked) {
      setEnabledCOD(true)
    } else if (id === 'qr' && !checked) {
      setEnabledQR(false)
      if (!enabledStripe && !enabledCOD) setEnabledStripe(true)
    } else if (id === 'qr' && checked) {
      setEnabledQR(true)
    }
    // console.log("value", checked, "event", event.target.value, "id", id);
  }

  return (
    <>
      <PageTitle>{t('storeSettingScreen.title')}</PageTitle>
      <AnimatedContent>
        <div className="sm:container w-full md:p-6 p-4 mx-auto bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg">
          <form onSubmit={handleSubmit((data) => onSubmit({ ...data, provinces }))}>
            <SettingContainer
              isSave={isSave}
              title={t('storeSettingScreen.table.titleDetails')}
              isSubmitting={isSubmitting}
            >
              <div className="flex-grow scrollbar-hide w-full max-h-full">
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t('storeSettingScreen.table.enableCOD')} <br />
                    <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
                      {t('storeSettingScreen.table.description')}
                    </span>
                  </label>
                  <div className="sm:col-span-4">
                    <SwitchToggle id="cod" processOption={enabledCOD} handleProcess={handleEnableDisableMethod} />
                  </div>
                </div>
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t('storeSettingScreen.table.enableQR')}
                  </label>
                  <div className="sm:col-span-4">
                    <SwitchToggle id="qr" processOption={enabledQR} handleProcess={handleEnableDisableMethod} />
                  </div>
                </div>

                <div
                  style={{
                    height: enabledQR ? 'auto' : 0,
                    transition: 'all .6s',
                    visibility: !enabledQR ? 'hidden' : 'visible',
                    opacity: !enabledQR ? '0' : '1',
                  }}
                  className={`${enabledQR ? 'mb-8' : 'mb-2'}`}
                >
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <Label label={t('storeSettingScreen.table.qrKey')} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledQR}
                        register={register}
                        label={t('QRKey')}
                        name="qr_key"
                        type="password"
                        placeholder={t('storeSettingScreen.table.qrKey')}
                      />
                      <Error errorName={errors.stripe_qr} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
                    <Label label={t('storeSettingScreen.table.qrSecret')} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledQR}
                        register={register}
                        label={t('QRSecret')}
                        name="qr_secret"
                        type="password"
                        placeholder={t('storeSettingScreen.table.qrSecret')}
                      />
                      <Error errorName={errors.qr_secret} />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <Label label={t('storeSettingScreen.table.enableStripe')} />
                  <div className="sm:col-span-4">
                    <SwitchToggle id="stripe" processOption={enabledStripe} handleProcess={handleEnableDisableMethod} />
                  </div>
                </div>

                <div
                  style={{
                    height: enabledStripe ? 'auto' : 0,
                    transition: 'all .6s',
                    visibility: !enabledStripe ? 'hidden' : 'visible',
                    opacity: !enabledStripe ? '0' : '1',
                  }}
                  className={`${enabledStripe ? 'mb-8' : 'mb-2'}`}
                >
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <Label label={t('storeSettingScreen.table.stripeKey')} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledStripe}
                        register={register}
                        label={t('StripeKey')}
                        name="stripe_key"
                        type="password"
                        placeholder={t('storeSettingScreen.table.stripeKey')}
                      />
                      <Error errorName={errors.stripe_key} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
                    <Label label={t('storeSettingScreen.table.stripeSecret')} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledStripe}
                        register={register}
                        label={t('StripeSecret')}
                        name="stripe_secret"
                        type="password"
                        placeholder={t('storeSettingScreen.table.stripeSecret')}
                      />
                      <Error errorName={errors.stripe_secret} />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <Label label={t('storeSettingScreen.table.enableRazorPay')} />
                  <div className="sm:col-span-4">
                    <SwitchToggle id="razorpay" processOption={enabledRazorPay} handleProcess={setEnabledRazorPay} />
                  </div>
                </div>

                <div
                  style={{
                    height: enabledRazorPay ? 'auto' : 0,
                    transition: 'all .6s',
                    visibility: !enabledRazorPay ? 'hidden' : 'visible',
                    opacity: !enabledRazorPay ? '0' : '1',
                  }}
                  className={`${enabledRazorPay ? 'mb-8' : 'mb-2'}`}
                >
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <Label label={t('storeSettingScreen.table.razorPayId')} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledRazorPay}
                        register={register}
                        label="RazorPay ID"
                        name="razorpay_id"
                        type="password"
                        placeholder={t('storeSettingScreen.table.razorPayId')}
                      />
                      <Error errorName={errors.razorpay_id} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
                    <Label label={t('storeSettingScreen.table.razorPaySecret')} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledRazorPay}
                        register={register}
                        label="RazorPay Secret"
                        name="razorpay_secret"
                        type="password"
                        placeholder={t('storeSettingScreen.table.razorPaySecret')}
                      />
                      <Error errorName={errors.razorpay_secret} />
                    </div>
                  </div>
                </div>

                {/* Next api base Url/backend url */}

                {/* <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    Next Api Base URL <br />
                    <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
                      (This is required for access to db)
                    </span>
                  </label>
                  <div className="sm:col-span-4">
                    <InputAreaTwo
                      pattern={{
                        value: "/^(https?|chrome)://[^s$.?#].[^s]*$/gm",
                        message: "Invalid url format",
                      }}
                      required={true}
                      register={register}
                      label="Next Api Base URL"
                      name="next_api_base_url"
                      type="text"
                      placeholder="Next Api Base URL(You backend live url)"
                    />
                    <Error errorName={errors.next_api_base_url} />
                  </div>
                </div> */}

                {/* next auth secret */}
                {/* <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    Next Auth Secret <br />
                    <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
                      (This is required for login or sign up)
                    </span>
                  </label>
                  <div className="sm:col-span-4">
                    <InputAreaTwo
                      required={true}
                      register={register}
                      label="Next Auth Secret"
                      name="nextauth_secret"
                      type="password"
                      placeholder="Next Auth Secret(Just add a random value with -base64 32)"
                    />
                    <Error errorName={errors.nextauth_secret} />
                  </div>
                </div> */}

                {/* Google key section */}
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <Label label={t('storeSettingScreen.table.enableGoogleLogin')} />
                  <div className="sm:col-span-4">
                    <SwitchToggle
                      id="google_login"
                      processOption={enabledGoogleLogin}
                      handleProcess={setEnabledGoogleLogin}
                    />
                  </div>
                </div>
                <div
                  style={{
                    height: enabledGoogleLogin ? 'auto' : 0,
                    transition: 'all .6s',
                    visibility: !enabledGoogleLogin ? 'hidden' : 'visible',
                    opacity: !enabledGoogleLogin ? '0' : '1',
                  }}
                  className={`${enabledGoogleLogin ? 'mb-8' : 'mb-2'}`}
                >
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <Label label={t('storeSettingScreen.table.googleClientId')} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledGoogleLogin}
                        register={register}
                        label={t('GoogleClientId')}
                        name="google_id"
                        type="password"
                        placeholder={t('storeSettingScreen.table.googleClientId')}
                      />
                      <Error errorName={errors.google_id} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
                    <Label label={t('storeSettingScreen.table.googleSecret')} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledGoogleLogin}
                        register={register}
                        label={t('GoogleSecret')}
                        name="google_secret"
                        type="password"
                        placeholder={t('storeSettingScreen.table.googleSecret')}
                      />
                      <Error errorName={errors.google_secret} />
                    </div>
                  </div>
                </div>

                {/* Github key section start*/}
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <Label label={t('storeSettingScreen.table.enableGithub')} />
                  <div className="sm:col-span-4">
                    <SwitchToggle
                      id="github_login"
                      processOption={enabledGithubLogin}
                      handleProcess={setEnabledGithubLogin}
                    />
                  </div>
                </div>
                <div
                  style={{
                    height: enabledGithubLogin ? 'auto' : 0,
                    transition: 'all .6s',
                    visibility: !enabledGithubLogin ? 'hidden' : 'visible',
                    opacity: !enabledGithubLogin ? '0' : '1',
                  }}
                  className={`${enabledGithubLogin ? 'mb-8' : 'mb-2'}`}
                >
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <Label label={t('storeSettingScreen.table.githubId')} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledGithubLogin}
                        register={register}
                        label="Github ID"
                        name="github_id"
                        type="password"
                        placeholder={t('storeSettingScreen.table.githubId')}
                      />
                      <Error errorName={errors.github_id} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
                    <Label label={t('storeSettingScreen.table.githubSecret')} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledGithubLogin}
                        register={register}
                        label="Github Secret"
                        name="github_secret"
                        type="password"
                        placeholder={t('storeSettingScreen.table.githubSecret')}
                      />
                      <Error errorName={errors.github_secret} />
                    </div>
                  </div>
                </div>
                {/* Github key section end*/}

                {/* Facebook key section start*/}
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <Label label={t('storeSettingScreen.table.enableFacebook')} />
                  <div className="sm:col-span-4">
                    <SwitchToggle
                      id="facebook_login"
                      processOption={enabledFacebookLogin}
                      handleProcess={setEnabledFacebookLogin}
                    />
                  </div>
                </div>
                <div
                  style={{
                    height: enabledFacebookLogin ? 'auto' : 0,
                    transition: 'all .6s',
                    visibility: !enabledFacebookLogin ? 'hidden' : 'visible',
                    opacity: !enabledFacebookLogin ? '0' : '1',
                  }}
                  className={`${enabledFacebookLogin ? 'mb-8' : 'mb-2'}`}
                >
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <Label label={t('storeSettingScreen.table.facebookId')} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledFacebookLogin}
                        register={register}
                        label="Facebook ID"
                        name="facebook_id"
                        type="password"
                        placeholder={t('storeSettingScreen.table.facebookId')}
                      />
                      <Error errorName={errors.facebook_id} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
                    <Label label={t('storeSettingScreen.table.facebookSecret')} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledFacebookLogin}
                        register={register}
                        label="Facebook Secret"
                        name="facebook_secret"
                        type="password"
                        placeholder={t('storeSettingScreen.table.facebookSecret')}
                      />
                      <Error errorName={errors.facebook_secret} />
                    </div>
                  </div>
                </div>

                {/* Facebook key section end*/}

                {/* Google Analytics section start */}
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <Label label={t('storeSettingScreen.table.enableGoggleAnalytics')} />
                  <div className="sm:col-span-4">
                    <SwitchToggle
                      id="google_analytics"
                      processOption={enabledGoogleAnalytics}
                      handleProcess={setEnabledGoogleAnalytics}
                    />
                  </div>
                </div>
                <div
                  style={{
                    height: enabledGoogleAnalytics ? 'auto' : 0,
                    transition: 'all .6s',
                    visibility: !enabledGoogleAnalytics ? 'hidden' : 'visible',
                    opacity: !enabledGoogleAnalytics ? '0' : '1',
                  }}
                  className={`${
                    enabledGoogleAnalytics
                      ? 'grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                      : 'mb-2'
                  }`}
                >
                  <Label label={t('storeSettingScreen.table.googleAnalyticKey')} />
                  <div className="sm:col-span-4">
                    <InputAreaTwo
                      required={enabledGoogleAnalytics}
                      register={register}
                      label={t('GoogleAnalyticKey')}
                      name="google_analytic_key"
                      type="password"
                      placeholder={t('storeSettingScreen.table.googleAnalyticKey')}
                    />
                    <Error errorName={errors.google_analytic_key} />
                  </div>
                </div>
                {/* Google Analytics section end */}

                {/* FB Pixel  section start */}
                {/* <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("EnableFacebookPixel")}
            </label>
            <div className="sm:col-span-4">
              <SwitchToggle
                id="facebook_pixel"
                processOption={enabledFbPixel}
                handleProcess={setEnableFbPixel}
              />
            </div>
          </div>
          <div
            style={{
              height: enabledFbPixel ? "auto" : 0,
              transition: "all .6s",
              visibility: !enabledFbPixel ? "hidden" : "visible",
              opacity: !enabledFbPixel ? "0" : "1",
            }}
            className={`${
              enabledFbPixel
                ? "grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
                : "mb-2"
            }`}
          >
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("FacebookPixelKey")}
            </label>
            <div className="sm:col-span-4">
              <InputAreaTwo
                required
                register={register}
                label={t("FacebookPixelKey")}
                name="fb_pixel_key"
                type="password"
                placeholder={t("FacebookPixelKey")}
              />
              <Error errorName={errors.fb_pixel_key} />
            </div>
          </div> */}
                {/* FB Pixel  section end */}

                {/* EnableTawkChat  section start */}
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <Label label={t('storeSettingScreen.table.enableTawkChat')} />
                  <div className="sm:col-span-4">
                    <SwitchToggle id="tawk_chat" processOption={enabledTawkChat} handleProcess={setEnabledTawkChat} />
                  </div>
                </div>
                <div
                  style={{
                    height: enabledTawkChat ? 'auto' : 0,
                    transition: 'all .6s',
                    visibility: !enabledTawkChat ? 'hidden' : 'visible',
                    opacity: !enabledTawkChat ? '0' : '1',
                  }}
                  className={`${enabledTawkChat ? 'mb-8' : 'mb-2'}`}
                >
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <Label label={t('storeSettingScreen.table.tawkChatPropertyID')} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledTawkChat}
                        register={register}
                        label={t('TawkChatPropertyID')}
                        name="tawk_chat_property_id"
                        type="password"
                        placeholder={t('storeSettingScreen.table.tawkChatPropertyID')}
                      />
                      <Error errorName={errors.tawk_chat_property_id} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
                    <Label label={t('storeSettingScreen.table.tawkChatWidgetID')} />
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={enabledTawkChat}
                        register={register}
                        label={t('TawkChatWidgetID')}
                        name="tawk_chat_widget_id"
                        type="password"
                        placeholder={t('storeSettingScreen.table.tawkChatWidgetID')}
                      />
                      <Error errorName={errors.tawk_chat_widget_id} />
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-5 items-start sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <Label label={t('storeSettingScreen.table.provinces')} />
                  <div className="sm:col-span-4">
                    <div className="flex flex-wrap items-center gap-2 border rounded px-3 py-2 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-400">
                      {provinces.map((province, index) => (
                        <span
                          key={province.key}
                          className="flex items-center bg-gray-700 text-white text-sm px-2 py-1 rounded-full"
                        >
                          {province.label}
                          <button
                            type="button"
                            onClick={() => removeProvince(province)}
                            className="ml-1 text-gray-300 hover:text-red-400"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        className="flex-grow bg-transparent text-gray-900 dark:text-white focus:outline-none"
                        placeholder={t('storeSettingScreen.table.textProvince')}
                        value={provinceInput}
                        onChange={(e) => setProvinceInput(e.target.value)}
                        onKeyDown={handleProvinceKeyDown}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SettingContainer>
          </form>
        </div>
      </AnimatedContent>
    </>
  )
}

export default StoreSetting
