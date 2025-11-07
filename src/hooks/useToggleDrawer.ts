import { useContext, useEffect, useState } from 'react'
import { SidebarContext } from '@/context/SidebarContext'

interface UseToggleDrawerReturn {
  title: string
  allId: string[]
  serviceId: string
  handleUpdate: (id: string, title: string) => void
  setServiceId: (id?: string) => void
  handleModalOpen: (id: string, title: string) => void
  handleDeleteMany: (id: string[], products?: any) => Promise<void>
  handleUpdateMany: (id: string[]) => void
}

const useToggleDrawer = (): UseToggleDrawerReturn => {
  const [serviceId, _setServiceId] = useState<string>('')
  const [allId, setAllId] = useState<string[]>([])
  const [title, setTitle] = useState<string>('')

  const { toggleDrawer, isDrawerOpen, toggleModal, toggleBulkDrawer } = useContext(SidebarContext)

  const setServiceId = (id?: string) => {
    _setServiceId(id ?? '')
  }

  const handleUpdate = (id: string, title: string) => {
    setServiceId(id)
    setTitle(title)
    toggleDrawer()
  }

  const handleUpdateMany = (id: string[]) => {
    setAllId(id)
    toggleBulkDrawer()
  }

  const handleModalOpen = (id: string, title: string) => {
    setServiceId(id)
    toggleModal()
    setTitle(title)
  }

  useEffect(() => {
    if (!isDrawerOpen) {
      setServiceId()
    }
  }, [isDrawerOpen])

  const handleDeleteMany = async (id: string[], products?: any): Promise<void> => {
    setAllId(id)
    toggleModal()
    setTitle('Selected Products')
  }

  return {
    title,
    allId,
    serviceId,
    handleUpdate,
    setServiceId,
    handleModalOpen,
    handleDeleteMany,
    handleUpdateMany,
  }
}

export default useToggleDrawer
