import { Button } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'
import { FiSettings } from 'react-icons/fi'
import { Tab, TabList, TabPanel, Tabs, Tabs as TabsComponent } from 'react-tabs'

//internal import

import Error from '@/components/form/others/Error'
import spinnerLoadingImage from '@/assets/img/spinner.gif'
import InputAreaTwo from '@/components/form/input/InputAreaTwo'
import SwitchToggle from '@/components/form/switch/SwitchToggle'
import TextAreaCom from '@/components/form/others/TextAreaCom'
import Uploader from '@/components/image-uploader/Uploader'

const AboutUs = ({
  isSave,
  register,
  errors,
  setAboutHeaderBg,
  aboutHeaderBg,
  setAboutPageHeader,
  aboutPageHeader,
  setAboutTopContentLeft,
  aboutTopContentLeft,
  setAboutTopContentRight,
  aboutTopContentRight,
  setAboutTopContentRightImage,
  aboutTopContentRightImage,
  setAboutMiddleContentSection,
  aboutMiddleContentSection,
  setAboutMiddleContentImage,
  aboutMiddleContentImage,
  setOurFounderSection,
  ourFounderSection,
  setOurFounderOneImage,
  ourFounderOneImage,
  setOurFounderTwoImage,
  ourFounderTwoImage,
  setOurFounderThreeImage,
  ourFounderThreeImage,
  setOurFounderFourImage,
  ourFounderFourImage,
  setOurFounderFiveImage,
  ourFounderFiveImage,
  setOurFounderSixImage,
  ourFounderSixImage,
  isSubmitting,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="grid grid-cols-12 font-sans pr-4">
        <div className="col-span-12 md:col-span-12 lg:col-span-12">
          <div className="sticky top-0 z-20 flex justify-end">
            {isSubmitting ? (
              <Button disabled={true} type="button" className="h-10 px-6">
                <img src={spinnerLoadingImage} alt="Loading" width={20} height={10} />{' '}
                <span className="font-serif ml-2 font-light"> {t('Processing')}</span>
              </Button>
            ) : (
              <Button type="submit" className="h-10 px-6 ">
                {' '}
                {isSave ? t('SaveBtn') : t('UpdateBtn')}
              </Button>
            )}
          </div>

          <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 md:mb-3 mb-1">
            <FiSettings className="mt-1 mr-2" />
            {t('storeCustomizationScreen.aboutUs.title')}
          </div>

          <hr className="md:mb-12 mb-3" />

          <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full">
            <div className="inline-flex md:text-base text-sm mb-3 text-gray-500 dark:text-gray-400">
              <strong>{t('storeCustomizationScreen.aboutUs.pageHeader.title')}</strong>
            </div>
            <hr className="md:mb-12 mb-3" />

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.aboutUs.pageHeader.enableThisBlock')}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setAboutPageHeader}
                  processOption={aboutPageHeader}
                  name={aboutPageHeader}
                />
              </div>
            </div>

            <div
              className="mb-height-0"
              style={{
                height: aboutPageHeader ? 'auto' : 0,
                transition: 'all 0.5s',
                visibility: !aboutPageHeader ? 'hidden' : 'visible',
                opacity: !aboutPageHeader ? '0' : '1',
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t('storeCustomizationScreen.aboutUs.pageHeader.pageHeaderBg')}
                </label>
                <div className="sm:col-span-4">
                  <Uploader imageUrl={aboutHeaderBg} setImageUrl={setAboutHeaderBg} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t('storeCustomizationScreen.aboutUs.pageHeader.pageTitle')}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Page Title"
                    name="about_page_title"
                    type="text"
                    placeholder={t('storeCustomizationScreen.aboutUs.pageHeader.pageTitle')}
                  />
                  <Error errorName={errors.about_page_title} />
                </div>
              </div>
            </div>

            <div className="inline-flex md:text-base text-sm mb-3 mt-5 text-gray-500 dark:text-gray-400">
              <strong>{t('storeCustomizationScreen.aboutUs.aboutPage.topContentLeft')}</strong>
            </div>
            <hr className="md:mb-12 mb-3" />

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.aboutUs.pageHeader.enableThisBlock')}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setAboutTopContentLeft}
                  processOption={aboutTopContentLeft}
                  name={aboutTopContentLeft}
                />
              </div>
            </div>

            <div
              className="mb-height-0"
              style={{
                height: aboutTopContentLeft ? 'auto' : 0,
                transition: 'all 0.5s',
                visibility: !aboutTopContentLeft ? 'hidden' : 'visible',
                opacity: !aboutTopContentLeft ? '0' : '1',
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t('storeCustomizationScreen.aboutUs.aboutPage.topTitle')}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Top Title"
                    name="about_page_Top_title"
                    type="text"
                    placeholder={t('storeCustomizationScreen.aboutUs.aboutPage.topTitle')}
                  />
                  <Error errorName={errors.about_page_Top_title_left} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t('storeCustomizationScreen.aboutUs.aboutPage.topDescription')}
                </label>

                <div className="sm:col-span-4">
                  <TextAreaCom
                    required={true}
                    register={register}
                    label="About Us Top Description"
                    name="about_us_top_description"
                    type="text"
                    placeholder={t('storeCustomizationScreen.aboutUs.aboutPage.topDescription')}
                  />
                  <Error errorName={(errors.name = 'about_us_top_description')} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t('storeCustomizationScreen.aboutUs.aboutPage.boxOneTitle')}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Top Title"
                    name="about_page_Top_left_box_one_title"
                    type="text"
                    placeholder={t('storeCustomizationScreen.aboutUs.aboutPage.boxOneTitle')}
                  />
                  <Error errorName={errors.about_page_Top_left_box_one_title} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t('storeCustomizationScreen.aboutUs.aboutPage.boxOneSubtitle')}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Top Title"
                    name="about_page_Top_left_box_one_subtitle"
                    type="text"
                    placeholder={t('storeCustomizationScreen.aboutUs.aboutPage.boxOneSubtitle')}
                  />
                  <Error errorName={errors.about_page_Top_left_box_one_subtitle} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t('storeCustomizationScreen.aboutUs.aboutPage.boxOneDescription')}
                </label>

                <div className="sm:col-span-4">
                  <TextAreaCom
                    required={true}
                    register={register}
                    label="About Us Top Box One Description"
                    name="about_us_top_box_one_description"
                    type="text"
                    placeholder={t('storeCustomizationScreen.aboutUs.aboutPage.boxOneDescription')}
                  />
                  <Error errorName={(errors.name = 'about_us_top_box_one_description')} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t('storeCustomizationScreen.aboutUs.aboutPage.boxTwoTitle')}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Top Title"
                    name="about_page_Top_left_box_two_title"
                    type="text"
                    placeholder={t('storeCustomizationScreen.aboutUs.aboutPage.boxTwoTitle')}
                  />
                  <Error errorName={(errors.name = 'about_page_Top_left_box_two_title')} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t('storeCustomizationScreen.aboutUs.aboutPage.boxTwoSubtitle')}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Top Title"
                    name="about_page_Top_left_box_two_subtitle"
                    type="text"
                    placeholder={t('storeCustomizationScreen.aboutUs.aboutPage.boxTwoSubtitle')}
                  />
                  <Error errorName={errors.about_page_Top_left_box_two_subtitle} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t('storeCustomizationScreen.aboutUs.aboutPage.boxTwoDescription')}
                </label>

                <div className="sm:col-span-4">
                  <TextAreaCom
                    required={true}
                    register={register}
                    label="About Us Top Box Two Description"
                    name="about_us_top_box_two_description"
                    type="text"
                    placeholder={t('storeCustomizationScreen.aboutUs.aboutPage.boxTwoDescription')}
                  />
                  <Error errorName={(errors.name = 'about_us_top_box_two_description')} />
                </div>
              </div>
            </div>

            <div className="inline-flex md:text-base text-sm mb-3 md:mt-5 text-gray-500 dark:text-gray-400 ">
              <strong>{t('storeCustomizationScreen.aboutUs.pageTop.topContentRight')}</strong>
            </div>
            <hr className="md:mb-12 mb-3" />
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.aboutUs.pageHeader.enableThisBlock')}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setAboutTopContentRight}
                  processOption={aboutTopContentRight}
                  name={aboutTopContentRight}
                />
              </div>
            </div>

            <div
              style={{
                height: aboutTopContentRight ? 'auto' : 0,
                transition: 'all 0.5s',
                visibility: !aboutTopContentRight ? 'hidden' : 'visible',
                opacity: !aboutTopContentRight ? '0' : '1',
              }}
              className="mb-height-0 grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative"
            >
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.aboutUs.pageTop.contentRightImage')}
              </label>
              <div className="sm:col-span-4">
                <Uploader
                  imageUrl={aboutTopContentRightImage}
                  setImageUrl={setAboutTopContentRightImage}
                  targetWidth={1050}
                  targetHeight={805}
                />
              </div>
            </div>

            <div className="inline-flex md:text-base text-sm mb-3 md:mt-5 text-gray-500 dark:text-gray-400 relative ">
              <strong>{t('storeCustomizationScreen.aboutUs.contentSection.title')}</strong>
            </div>
            <hr className="md:mb-12 mb-3" />
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.aboutUs.pageHeader.enableThisBlock')}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setAboutMiddleContentSection}
                  processOption={aboutMiddleContentSection}
                  name={aboutMiddleContentSection}
                />
              </div>
            </div>

            <div
              className="mb-height-0"
              style={{
                height: aboutMiddleContentSection ? 'auto' : 0,
                transition: 'all 0.5s',
                visibility: !aboutMiddleContentSection ? 'hidden' : 'visible',
                opacity: !aboutMiddleContentSection ? '0' : '1',
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t('storeCustomizationScreen.aboutUs.contentSection.descriptionOne')}
                </label>

                <div className="sm:col-span-4">
                  <TextAreaCom
                    required={true}
                    register={register}
                    label="About Us Middle Description"
                    name="about_us_middle_description_one"
                    type="text"
                    placeholder={t('storeCustomizationScreen.aboutUs.contentSection.descriptionOne')}
                  />
                  <Error errorName={(errors.name = 'about_us_middle_description_one')} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t('storeCustomizationScreen.aboutUs.contentSection.descriptionTwo')}
                </label>

                <div className="sm:col-span-4">
                  <TextAreaCom
                    required={true}
                    register={register}
                    label="About Us Middle Description"
                    name="about_us_middle_description_two"
                    type="text"
                    placeholder={t('storeCustomizationScreen.aboutUs.contentSection.descriptionTwo')}
                  />
                  <Error errorName={(errors.name = 'about_us_middle_description_two')} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t('storeCustomizationScreen.aboutUs.contentSection.image')}
                </label>
                <div className="sm:col-span-4">
                  <Uploader
                    imageUrl={aboutMiddleContentImage}
                    setImageUrl={setAboutMiddleContentImage}
                    targetWidth={1420}
                    targetHeight={425}
                  />
                </div>
              </div>
            </div>

            <div className="inline-flex md:text-base text-sm mb-3 md:mt-5 text-gray-500 dark:text-gray-400 ">
              <strong>{t('storeCustomizationScreen.aboutUs.ourTeam.title')}</strong>
            </div>
            <hr className="md:mb-12 mb-3" />

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t('storeCustomizationScreen.aboutUs.pageHeader.enableThisBlock')}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setOurFounderSection}
                  processOption={ourFounderSection}
                  name={ourFounderSection}
                />
              </div>
            </div>

            <div
              className="mb-height-0"
              style={{
                height: ourFounderSection ? 'auto' : 0,
                transition: 'all 0.5s',
                visibility: !ourFounderSection ? 'hidden' : 'visible',
                opacity: !ourFounderSection ? '0' : '1',
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t('storeCustomizationScreen.aboutUs.ourTeam.foundertitle')}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="about_page_ourfounder_title"
                    type="text"
                    placeholder={t('storeCustomizationScreen.aboutUs.ourTeam.foundertitle')}
                  />
                  <Error errorName={errors.about_page_ourfounder_title} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t('storeCustomizationScreen.aboutUs.ourTeam.description')}
                </label>
                <div className="sm:col-span-4">
                  <TextAreaCom
                    required={true}
                    register={register}
                    label="Our Founder Description"
                    name="about_us_ourfounder_description"
                    type="text"
                    placeholder={t('storeCustomizationScreen.aboutUs.ourTeam.description')}
                  />
                  <Error errorName={(errors.name = 'about_us_ourfounder_description')} />
                </div>
              </div>

              {/*  ====================================================== Our Team Tabs ====================================================== */}

              <TabsComponent>
                <Tabs>
                  <TabList>
                    <Tab>{t('storeCustomizationScreen.aboutUs.ourTeam.member')} 1</Tab>
                    <Tab>{t('storeCustomizationScreen.aboutUs.ourTeam.member')} 2</Tab>
                    <Tab>{t('storeCustomizationScreen.aboutUs.ourTeam.member')} 3</Tab>
                    <Tab>{t('storeCustomizationScreen.aboutUs.ourTeam.member')} 4</Tab>
                    <Tab>{t('storeCustomizationScreen.aboutUs.ourTeam.member')} 5</Tab>
                    <Tab>{t('storeCustomizationScreen.aboutUs.ourTeam.member')} 6</Tab>
                  </TabList>

                  <TabPanel className="mt-10">
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.image')}
                      </label>
                      <div className="sm:col-span-4">
                        <Uploader
                          imageUrl={ourFounderOneImage}
                          setImageUrl={setOurFounderOneImage}
                          targetWidth={600}
                          targetHeight={600}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.oneTitle')}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Title"
                          name="about_page_ourfounder_one_title"
                          type="text"
                          placeholder={t('storeCustomizationScreen.aboutUs.ourTeam.oneTitle')}
                        />
                        <Error errorName={errors.about_page_ourfounder_one_title} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.oneSubTitle')}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Sub Title"
                          name="about_page_ourfounder_one_sub_title"
                          type="text"
                          placeholder={t('storeCustomizationScreen.aboutUs.ourTeam.oneSubTitle')}
                        />
                        <Error errorName={errors.about_page_ourfounder_one_sub_title} />
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.twoImage')}
                      </label>
                      <div className="sm:col-span-4">
                        <Uploader
                          imageUrl={ourFounderTwoImage}
                          setImageUrl={setOurFounderTwoImage}
                          targetWidth={600}
                          targetHeight={600}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.twoTitle')}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Title"
                          name="about_page_ourfounder_two_title"
                          type="text"
                          placeholder={t('storeCustomizationScreen.aboutUs.ourTeam.twoTitle')}
                        />
                        <Error errorName={errors.about_page_ourfounder_two_title} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.twoSubTitle')}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Sub Title"
                          name="about_page_ourfounder_two_sub_title"
                          type="text"
                          placeholder={t('storeCustomizationScreen.aboutUs.ourTeam.twoSubTitle')}
                        />
                        <Error errorName={errors.about_page_ourfounder_two_sub_title} />
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.threeImage')}
                      </label>
                      <div className="sm:col-span-4">
                        <Uploader
                          imageUrl={ourFounderThreeImage}
                          setImageUrl={setOurFounderThreeImage}
                          targetWidth={600}
                          targetHeight={600}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.threeTitle')}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Title"
                          name="about_page_ourfounder_three_title"
                          type="text"
                          placeholder={t('storeCustomizationScreen.aboutUs.ourTeam.threeTitle')}
                        />
                        <Error errorName={errors.about_page_ourfounder_three_title} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.threeSubTitle')}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Sub Title"
                          name="about_page_ourfounder_three_sub_title"
                          type="text"
                          placeholder={t('storeCustomizationScreen.aboutUs.ourTeam.threeSubTitle')}
                        />
                        <Error errorName={errors.about_page_ourfounder_three_sub_title} />
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.fourImage')}
                      </label>
                      <div className="sm:col-span-4">
                        <Uploader
                          imageUrl={ourFounderFourImage}
                          setImageUrl={setOurFounderFourImage}
                          targetWidth={600}
                          targetHeight={600}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.fourTitle')}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Title"
                          name="about_page_ourfounder_four_title"
                          type="text"
                          placeholder={t('storeCustomizationScreen.aboutUs.ourTeam.fourTitle')}
                        />
                        <Error errorName={errors.about_page_ourfounder_four_title} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.fourSubTitle')}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Sub Title"
                          name="about_page_ourfounder_four_sub_title"
                          type="text"
                          placeholder={t('storeCustomizationScreen.aboutUs.ourTeam.fourSubTitle')}
                        />
                        <Error errorName={errors.about_page_ourfounder_four_sub_title} />
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.fiveImage')}
                      </label>
                      <div className="sm:col-span-4">
                        <Uploader
                          imageUrl={ourFounderFiveImage}
                          setImageUrl={setOurFounderFiveImage}
                          targetWidth={600}
                          targetHeight={600}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.fiveTitle')}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Title"
                          name="about_page_ourfounder_five_title"
                          type="text"
                          placeholder={t('storeCustomizationScreen.aboutUs.ourTeam.fiveTitle')}
                        />
                        <Error errorName={errors.about_page_ourfounder_five_title} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.fiveSubTitle')}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Sub Title"
                          name="about_page_ourfounder_five_sub_title"
                          type="text"
                          placeholder={t('storeCustomizationScreen.aboutUs.ourTeam.fiveSubTitle')}
                        />
                        <Error errorName={errors.about_page_ourfounder_five_sub_title} />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 ">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.sixImage')}
                      </label>
                      <div className="sm:col-span-4">
                        <Uploader
                          imageUrl={ourFounderSixImage}
                          setImageUrl={setOurFounderSixImage}
                          targetWidth={600}
                          targetHeight={600}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.sixTitle')}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Title"
                          name="about_page_ourfounder_six_title"
                          type="text"
                          placeholder={t('storeCustomizationScreen.aboutUs.ourTeam.sixTitle')}
                        />
                        <Error errorName={errors.about_page_ourfounder_six_title} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                      <label className="block md:md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                        {t('storeCustomizationScreen.aboutUs.ourTeam.sixSubTitle')}
                      </label>
                      <div className="sm:col-span-4">
                        <InputAreaTwo
                          register={register}
                          label="Sub Title"
                          name="about_page_ourfounder_six_sub_title"
                          type="text"
                          placeholder={t('storeCustomizationScreen.aboutUs.ourTeam.sixSubTitle')}
                        />
                        <Error errorName={errors.about_page_ourfounder_six_sub_title} />
                      </div>
                    </div>
                  </TabPanel>
                </Tabs>
              </TabsComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutUs
