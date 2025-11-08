import React from 'react'

// internal imports
import useUtilsFunction from '@/hooks/useUtilsFunction'
import { type Language } from '@/types/Language'

interface SelectLanguageProps {
  handleLanguageChange: (language: Language) => void
}

const SelectLanguage: React.FC<SelectLanguageProps> = ({ handleLanguageChange }) => {
  const { languages, langError, langLoading } = useUtilsFunction() as {
    languages: Language[]
    langError: boolean
    langLoading: boolean
  }

  return (
    <ul className="dropdown-content w-full">
      {!langError &&
        !langLoading &&
        languages?.map((lang) => (
          <li
            key={lang.id}
            className="cursor-pointer flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            onClick={() => handleLanguageChange(lang)}
          >
            {/* Flag */}
            <div
              className="flag bg-start"
              style={{
                backgroundImage: lang.flag
                  ? `url(https://flagcdn.com/w20/${lang.flag.toLowerCase()}.png)`
                  : 'none',
              }}
            ></div>

            {/* Language Name */}
            <span className="text-gray-900 dark:text-gray-600 pr-8 text-right">{lang.name}</span>
          </li>
        ))}
    </ul>
  )
}

export default SelectLanguage
