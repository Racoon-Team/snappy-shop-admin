import React from 'react'
import DesktopSidebar from '@/components/sidebar/DesktopSidebar'
import MobileSidebar from '@/components/sidebar/MobileSidebar'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
  const { t } = useTranslation()
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}

export default Sidebar
