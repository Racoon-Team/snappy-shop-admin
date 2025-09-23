import React from 'react'
import { Input } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'

const InputArea = ({
  register,
  defaultValue,
  required,
  name,
  label,
  type = 'text',
  autoComplete,
  placeholder,
  className = '',
  value,
  readOnly,
}) => {
  const { t } = useTranslation()
  return (
    <Input
      {...register(name, {
        required: required ? `${label}  ${t('common.isRequired')}` : false,
      })}
      defaultValue={defaultValue}
      type={type}
      placeholder={placeholder}
      name={name}
      autoComplete={autoComplete}
      className={`mr-2 h-12 p-2 ${className}`}
      value={value}
      readOnly={readOnly}
    />
  )
}

export default InputArea
