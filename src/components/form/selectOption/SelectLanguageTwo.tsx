import React, { useContext } from 'react'
import type { UseFormRegister } from 'react-hook-form'
import { SidebarContext } from '@/context/SidebarContext'
import useUtilsFunction from '@/hooks/useUtilsFunction'
import type { Language } from '@/types/Language'

interface SelectLanguageTwoProps {
  handleSelectLanguage: (value: string) => void
  register: UseFormRegister<any>
}

const SelectLanguageTwo: React.FC<SelectLanguageTwoProps> = ({ handleSelectLanguage, register }) => {
  const { languages, langError, langLoading } = useUtilsFunction()
  const { lang } = useContext(SidebarContext)

  return (
    <select
      {...register('language', { required: 'language is required!' })}
      onChange={(e) => handleSelectLanguage(e.target.value)}
      className="block w-20 h-10 border border-emerald-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700"
    >
      <option value={lang} defaultChecked hidden>
        {lang}
      </option>
      {!langError &&
        !langLoading &&
        languages?.map((language: Language) => (
          <option key={language.id} value={language.isoCode}>
            {language.isoCode}
          </option>
        ))}
    </select>
  )
}

export default SelectLanguageTwo
