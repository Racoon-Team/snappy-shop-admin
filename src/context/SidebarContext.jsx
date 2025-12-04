import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { createContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageServices from '@/services/LanguageServices'
import SettingServices from '@/services/SettingServices'

export const SidebarContext = createContext()

export const SidebarProvider = ({ children }) => {
  const resultsPerPage = 20
  const searchRef = useRef('')
  const invoiceRef = useRef('')

  const [limitData, setLimitData] = useState(20)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isBulkDrawerOpen, setIsBulkDrawerOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [lang, setLang] = useState('en')
  const [currLang, setCurrLang] = useState({
    isoCode: 'en',
    name: 'English',
    flag: 'US',
  })
  const [time, setTime] = useState('')
  const [sortedField, setSortedField] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState(null)
  const [invoice, setInvoice] = useState(null)
  const [zone, setZone] = useState('')
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [method, setMethod] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [windowDimension, setWindowDimension] = useState(window.innerWidth)
  const [loading, setLoading] = useState(false)
  const [navBar, setNavBar] = useState(true)
  const { i18n } = useTranslation()
  const [tabIndex, setTabIndex] = useState(0)

  const { data: globalSetting } = useQuery({
    queryKey: ['globalSetting'],
    queryFn: async () => await SettingServices.getGlobalSetting(),
    staleTime: 20 * 60 * 1000,
    gcTime: 25 * 60 * 1000,
  })

  const { data: languages } = useQuery({
    queryKey: ['languages'],
    queryFn: async () => await LanguageServices.getShowingLanguage(),
    staleTime: 20 * 60 * 1000,
    gcTime: 25 * 60 * 1000,
  })

  const persistCurrLang = (value) => {
    try {
      localStorage.setItem('_currLang', JSON.stringify(value))
    } catch (err) {
      console.error('Error persisting _currLang in localStorage:', err)
    }
  }

  const handleLanguageChange = (value) => {
    try {
      Cookies.set('i18next', value?.isoCode || 'en', {
        sameSite: 'Lax',
      })
    } catch (err) {
      console.error('Error setting language cookie:', err)
    }

    i18n.changeLanguage(value?.isoCode)
    setLang(value?.isoCode)
    setCurrLang(value)
    persistCurrLang(value)
  }

  const closeSidebar = () => setIsSidebarOpen(false)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const closeDrawer = () => setIsDrawerOpen(false)
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)
  const closeBulkDrawer = () => setIsBulkDrawerOpen(false)
  const toggleBulkDrawer = () => setIsBulkDrawerOpen(!isBulkDrawerOpen)
  const closeModal = () => setIsModalOpen(false)
  const toggleModal = () => setIsModalOpen(!isModalOpen)
  const handleChangePage = (p) => setCurrentPage(p)
  const handleSubmitForAll = (e) => {
    e.preventDefault()
    setSearchText(searchRef?.current?.value)
  }

  useEffect(() => {
    const pathnameIsLogin = window?.location.pathname === '/login'
    let parsedStored = null
    try {
      const stored = localStorage.getItem('_currLang')
      parsedStored = stored ? JSON.parse(stored) : null
    } catch {
      parsedStored = null
    }

    const defaultLang = globalSetting?.default_language || 'en'
    const cookieLang = Cookies.get('i18next') || defaultLang
    const removeRegion = (lc) => (lc ? lc.split('-')[0] : 'en')
    let selectedLang = removeRegion(cookieLang)

    if (parsedStored) {
      setCurrLang(parsedStored)
      selectedLang = parsedStored.isoCode || selectedLang
    } else {
      if (languages?.length) {
        const found = languages.find((l) => l.isoCode === selectedLang)
        if (found) setCurrLang(found)
      } else {
        setCurrLang((prev) => ({ ...prev, isoCode: selectedLang }))
      }
    }

    setLang(selectedLang)

    if (i18n.language !== selectedLang) {
      i18n.changeLanguage(selectedLang)
    }

    try {
      Cookies.set('i18next', selectedLang, { sameSite: 'Lax' })
    } catch (err) {
      console.error('Error setting i18next cookie:', err)
    }

    const handler = (lng) => {
      const code = removeRegion(lng)
      setLang(code)

      if (languages?.length) {
        const found = languages.find((l) => l.isoCode === code)
        if (found) {
          setCurrLang(found)
          persistCurrLang(found)
        } else {
          setCurrLang((prev) => ({ ...prev, isoCode: code }))
          persistCurrLang({ isoCode: code, name: code, flag: code.toUpperCase() })
        }
      } else {
        setCurrLang((prev) => ({ ...prev, isoCode: code }))
      }
    }
    i18n.on('languageChanged', handler)

    return () => {
      i18n.off('languageChanged', handler)
    }
  }, [globalSetting?.default_language, languages, i18n])

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <SidebarContext.Provider
      value={{
        method,
        setMethod,
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        isDrawerOpen,
        toggleDrawer,
        closeDrawer,
        setIsDrawerOpen,
        closeBulkDrawer,
        isBulkDrawerOpen,
        toggleBulkDrawer,
        isModalOpen,
        toggleModal,
        closeModal,
        isUpdate,
        setIsUpdate,
        lang,
        setLang,
        currLang,
        handleLanguageChange,
        currentPage,
        setCurrentPage,
        handleChangePage,
        searchText,
        setSearchText,
        category,
        setCategory,
        searchRef,
        handleSubmitForAll,
        status,
        setStatus,
        zone,
        setZone,
        time,
        setTime,
        sortedField,
        setSortedField,
        resultsPerPage,
        limitData,
        setLimitData,
        windowDimension,
        modalOpen,
        setModalOpen,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        loading,
        setLoading,
        invoice,
        setInvoice,
        invoiceRef,
        setNavBar,
        navBar,
        tabIndex,
        setTabIndex,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
