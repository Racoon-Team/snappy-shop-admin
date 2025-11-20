import { Input } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'

const InputAreaTwo = ({ register, defaultValue, required, name, label, type, placeholder }) => {
   const { t } = useTranslation()
  return (
    <>
      <Input
        {...register(`${name}`, {
          required: required ? `${label} ${t('common.isRequired')}` : false,
        })}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        name={name}
        autoComplete="new-password"
        className="mr-2 p-2"
      />
    </>
  )
}

export default InputAreaTwo
