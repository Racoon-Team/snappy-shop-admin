import { Select } from '@windmill/react-ui'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Scrollbars } from 'react-custom-scrollbars-2'

//internal import
import Error from '@/components/form/others/Error'
import Title from '@/components/form/others/Title'
import LabelArea from '@/components/form/selectOption/LabelArea'
import InputArea from '@/components/form/input/InputArea'
import DrawerButton from '@/components/form/button/DrawerButton'
import TagInputTwo from '@/components/common/TagInputTwo'
import useAttributeSubmit from '@/hooks/useAttributeSubmit'

const AttributeDrawer = ({ id }) => {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    variants,
    addVariant,
    isSubmitting,
    removeVariant,
    handleSelectLanguage,
  } = useAttributeSubmit(id)

  const { t } = useTranslation()

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t('attributesScreen.drawer.addValue')}
            description={t('attributesScreen.drawer.addValueDescription')}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t('attributesScreen.drawer.addValue')}
            description={t('attributesScreen.drawer.addValueDescription')}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('attributesScreen.drawer.addTitleLbl')} />
              <div className="col-span-8 sm:col-span-4">
                {/* <SelectAttribute
                  register={register}
                  label="Attribute Title"
                  name="title"
                /> */}
                <InputArea
                  required={true}
                  register={register}
                  label={t('attributesScreen.drawer.addTitleLbl')}
                  name="title"
                  type="text"
                  placeholder={t('attributesScreen.drawer.addTitlePh')}
                />
                <Error errorName={errors.title} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
              <LabelArea label={t('attributesScreen.drawer.displayName')} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label={t('attributesScreen.drawer.displayName')}
                  name="name"
                  type="text"
                  placeholder={t('attributesScreen.drawer.displayName')}
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 relative">
              <LabelArea label={t('attributesScreen.drawer.options')} />
              <div className="col-span-8 sm:col-span-4 ">
                <Select
                  name="option"
                  {...register(`option`, {
                    required: t('attributesScreen.drawer.required'),
                  })}
                >
                  <option value="" defaultValue hidden>
                    {t('attributesScreen.drawer.select')}
                  </option>
                  <option value="Dropdown">{t('attributesScreen.drawer.dropDown')}</option>
                  <option value="Radio">{t('attributesScreen.drawer.radio')}</option>
                  {/* <option value="Checkbox">Checkbox</option> */}
                </Select>
                <Error errorName={errors.option} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title={t('attributesScreen.drawer.singularBtn')} isSubmitting={isSubmitting} />
        </form>
        <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40 ">
          {!id && (
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
              <LabelArea label={t('attributesScreen.drawer.variants')} />
              <div className="col-span-8 sm:col-span-4">
                <TagInputTwo notes={variants} addNote={addVariant} removeNote={removeVariant} />
                {/* <ReactTagInput
                    placeholder="White or S or Cotton or 40X60 or Premium...(Write then press enter to add new color)"
                    tags={variants}
                    onChange={(variant) => setVariants(variant)}
                  /> */}
              </div>
            </div>
          )}
        </div>
      </Scrollbars>
    </>
  )
}

export default AttributeDrawer
