import { Input } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'
const InputValueFive = ({
  name,
  label,
  type,
  disabled,
  register,
  required,
  maxValue,
  minValue,
  defaultValue,
  placeholder,
}) => {
  const { t } = useTranslation()
  const value = {
    valueAsNumber: true,
    required: required ? t('productsScreen.drawer.quantityValidation', { label }) : false,
    max: {
      value: maxValue,
      message: `Maximum value ${maxValue}!`,
    },
    min: {
      value: minValue,
      message: t('productsScreen.drawer.validationMin', { minValue }),
    },
    pattern: {
      value: /^[0-9]*$/,
      message: `Invalid ${label}!`,
    },
    // onBlur: (e) => handleTotalVolume(e.target.value, 'stock'),
  }

  return (
    <>
      <div className={`flex flex-row`}>
        <Input
          {...register(`${name}`, value)}
          name={name}
          type={type}
          disabled={disabled}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="mr-2 p-2"
        />
      </div>
    </>
  )
}

export default InputValueFive
