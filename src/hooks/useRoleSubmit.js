import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SidebarContext } from '@/context/SidebarContext'
import RoleServices from '@/services/RoleServices'
import { notifyError, notifySuccess } from '@/utils/toast'
import { useTranslation } from 'react-i18next'

const useRoleSubmit = (id) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPermissions, setSelectedPermissions] = useState([])

  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext)
  const { t } = useTranslation()

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm()

  const onSubmit = async ({ name }) => {
    try {
      setIsSubmitting(true)

      const roleData = {
        name,
        permissions: selectedPermissions,
      }

      if (id) {
        await RoleServices.updateRole(id, roleData)
        console.log('id', id)
        setIsUpdate(true)
        notifySuccess(t('roleScreen.message.update'))
      } else {
        const res = await RoleServices.createRole(roleData)
        setIsUpdate(true)
        notifySuccess(res.message || t('roleScreen.message.add'))
      }

      setIsSubmitting(false)
      closeDrawer()
    } catch (err) {
      setIsSubmitting(false)
      notifyError(err?.response?.data?.message || err?.message)
      closeDrawer()
    }
  }

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue('name', '')
      setSelectedPermissions([])
      clearErrors('name')
      return
    }

    if (id) {
      ;(async () => {
        try {
          const res = await RoleServices.getRoleById(id)
          console.log('id', id)
          if (res) {
            setValue('name', res.name)
            setSelectedPermissions(res.permissions || [])
          }
        } catch (err) {
          notifyError(err?.response?.data?.message || err?.message)
        }
      })()
    }
  }, [clearErrors, id, isDrawerOpen, setValue])

  return {
    errors,
    onSubmit,
    register,
    isSubmitting,
    handleSubmit,
    selectedPermissions,
    setSelectedPermissions,
  }
}

export default useRoleSubmit
