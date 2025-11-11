import React from 'react'
import { Input as WindmillInput } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'
import type { UseFormRegister, FieldValues } from 'react-hook-form'
import type { ForwardRefExoticComponent, InputHTMLAttributes, RefAttributes } from 'react'

type NativeInputProps = InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>
const Input = WindmillInput as unknown as ForwardRefExoticComponent<NativeInputProps>

interface InputAreaProps {
  register: UseFormRegister<FieldValues>
  name: string
  label: string
  defaultValue?: string
  required?: boolean
  type?: string
  autoComplete?: string
  placeholder?: string
  className?: string
  value?: string
  readOnly?: boolean
  pattern?: string | RegExp
  minLength?: number
  maxLength?: number
}

const InputArea: React.FC<InputAreaProps> = ({
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

  const {
    onChange,
    onBlur,
    ref,
    name: inputName,
  } = register(name, {
    required: required ? `${label} ${t('common.isRequired')}` : false,
  })

  return (
    <Input
      ref={ref}
      name={inputName}
      onChange={onChange}
      onBlur={onBlur}
      defaultValue={defaultValue}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={`mr-2 h-12 p-2 ${className}`}
      value={value}
      readOnly={readOnly}
    />
  )
}

export default InputArea
