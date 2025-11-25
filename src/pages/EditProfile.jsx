import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'

//internal import
import { AdminContext } from '@/context/AdminContext'
import useStaffSubmit from '@/hooks/useStaffSubmit'
import PageTitle from '@/components/common/PageTitle'
import LabelArea from '@/components/form/selectOption/LabelArea'
import Uploader from '@/components/image-uploader/Uploader'
import InputArea from '@/components/form/input/InputArea'
import Error from '@/components/form/others/Error'
import AnimatedContent from '@/components/common/AnimatedContent'
import RoleServices from '@/services/RoleServices'

const EditProfile = () => {
  const { t } = useTranslation()
  const {
    state: { adminInfo },
  } = useContext(AdminContext)

  const { register, handleSubmit, onSubmit, errors, imageUrl, setImageUrl } = useStaffSubmit(adminInfo._id)

  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState('')

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await RoleServices.getRoles()
        setRoles(res)
      } catch (error) {
        console.error('Error fetching roles', error)
      }
    }

    fetchRoles()
  }, [])

  useEffect(() => {
    if (adminInfo?.role) {
      const roleId = adminInfo.role.id || adminInfo.role
      setSelectedRole(roleId)
    }
  }, [adminInfo])

  const handleRoleChange = (e) => {
    const id = e.target.value
    setSelectedRole(id)
    register('role').onChange({ target: { value: id } })
  }

  return (
    <>
      <PageTitle> {t('EditProfile')} </PageTitle>
      <AnimatedContent>
        <div className="container p-6 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6 flex-grow scrollbar-hide w-full max-h-full">
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t('profileMenu.editProfile.labelProfile')} />
                <div className="col-span-8 sm:col-span-4">
                  <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} folder="customer" />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t('profileMenu.editProfile.labelName')} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    required={true}
                    register={register}
                    label={t('profileMenu.editProfile.labelName')}
                    name="name"
                    type="text"
                    placeholder={t('profileMenu.editProfile.inputName')}
                  />
                  <Error errorName={errors.name} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t('profileMenu.editProfile.labelEmail')} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    required={true}
                    register={register}
                    label={t('profileMenu.editProfile.labelEmail')}
                    name="email"
                    type="text"
                    placeholder={t('profileMenu.editProfile.inputEmail')}
                  />
                  <Error errorName={errors.email} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t('profileMenu.editProfile.labelNumber')} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    required={true}
                    register={register}
                    label={t('profileMenu.editProfile.labelNumber')}
                    name="phone"
                    type="text"
                    placeholder={t('profileMenu.editProfile.inputNumber')}
                  />
                  <Error errorName={errors.phone} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t('profileMenu.editProfile.labelRole')} />
                <div className="col-span-8 sm:col-span-4">
                  <select
                    {...register('role', { required: true })}
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-200"
                  >
                    <option value="" disabled>
                      {t('profileMenu.editProfile.selectRole')}
                    </option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                  <Error errorName={errors.role} />
                </div>
              </div>
            </div>

            <div className="flex flex-row-reverse pr-6 pb-6">
              <Button type="submit" className="h-12 px-6">
                {t('profileMenu.editProfile.updateBtn')}
              </Button>
            </div>
          </form>
        </div>
      </AnimatedContent>
    </>
  )
}

export default EditProfile
