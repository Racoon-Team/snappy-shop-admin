import React, { useContext, useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { Card, CardBody, Input, WindmillContext } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'
import { MultiSelect } from 'react-multi-select-component'

//internal import
import { routeAccessList } from '@/routes'
import useGetCData from '@/hooks/useGetCData'
import Error from '@/components/form/others/Error'
import Title from '@/components/form/others/Title'
import InputArea from '@/components/form/input/InputArea'
import useStaffSubmit from '@/hooks/useStaffSubmit'
import SelectRole from '@/components/form/selectOption/SelectRole'
import DrawerButton from '@/components/form/button/DrawerButton'
import LabelArea from '@/components/form/selectOption/LabelArea'
import Uploader from '@/components/image-uploader/Uploader'

import RoleServices from '@/services/RoleServices'
import AdminServices from '@/services/AdminServices'

const StaffDrawer = ({ id }) => {
  const { role } = useGetCData()
  const [roles, setRoles] = useState([])
  const { mode } = useContext(WindmillContext)
  const [rolePermissions, setRolePermissions] = useState([])
  const [selectedRole, setSelectedRole] = useState('')
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    adminInfo,
    imageUrl,
    setImageUrl,
    isSubmitting,
    selectedDate,
    setSelectedDate,
    accessedRoutes,
    setAccessedRoutes,
    handleSelectLanguage,
  } = useStaffSubmit(id)

  const handleRoleChange = (e) => {
    const selectedRoleId = e.target.value
    setSelectedRole(selectedRoleId)

    register('role').onChange({ target: { value: selectedRoleId } })

    const selectedRole = roles.find((r) => r._id === selectedRoleId)
    setRolePermissions(selectedRole?.permissions || [])
  }

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await RoleServices.getRoles()
        setRoles(res)
      } catch (error) {
        console.error(t('roleScreen.drawer.error', error))
      }
    }
    fetchRoles()
  }, [])
  useEffect(() => {
    if (id && adminInfo?.role) {
      setSelectedRole(adminInfo.role._id || adminInfo.role)
    }
  }, [id, adminInfo])
  const { t } = useTranslation()
  const translatedRouteAccessList = routeAccessList.map((route) => ({
    ...route,
    label: t(`staffScreen.drawer.selectAccess.${route.value}`),
  }))

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t('staffScreen.drawer.titleUpdate')}
            description={t('staffScreen.drawer.descriptionUpdate')}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t('staffScreen.drawer.titleAdd')}
            description={t('staffScreen.drawer.descriptionAdd')}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t('staffScreen.drawer.labelStaffImage')} />
                  <div className="col-span-8 sm:col-span-4">
                    <Uploader
                      imageUrl={imageUrl}
                      setImageUrl={setImageUrl}
                      folder="admin"
                      targetWidth={238}
                      targetHeight={238}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t('staffScreen.drawer.labelName')} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      required={true}
                      register={register}
                      label="Name"
                      name="name"
                      type="text"
                      autoComplete="username"
                      placeholder={t('staffScreen.drawer.inputName')}
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t('staffScreen.drawer.labelEmail')} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      required={true}
                      register={register}
                      label="Email"
                      name="email"
                      type="text"
                      autoComplete="username"
                      pattern={
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                      }
                      placeholder={t('staffScreen.drawer.inputEmail')}
                    />
                    <Error errorName={errors.email} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t('staffScreen.drawer.labelPassword')} />
                  <div className="col-span-8 sm:col-span-4">
                    {id ? (
                      <InputArea
                        register={register}
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder={t('staffScreen.drawer.inputPassword')}
                      />
                    ) : (
                      <InputArea
                        required={true}
                        register={register}
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder={t('staffScreen.drawer.inputPassword')}
                      />
                    )}

                    <Error errorName={errors.password} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t('staffScreen.drawer.labelContact')} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      required={true}
                      register={register}
                      label="Contact Number"
                      name="phone"
                      pattern={/^[+]?\d*$/}
                      minLength={6}
                      maxLength={15}
                      type="text"
                      placeholder={t('staffScreen.drawer.inputContact')}
                    />
                    <Error errorName={errors.phone} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t('staffScreen.drawer.labelJoiningDate')} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      onChange={(e) => setSelectedDate(e.target.value)}
                      label="Joining Date"
                      name="joiningDate"
                      value={selectedDate}
                      type="date"
                      placeholder=""
                    />
                    <Error errorName={errors.joiningDate} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t('staffScreen.drawer.labelRole')} />
                  <div className="col-span-8 sm:col-span-4">
                    <select
                      {...register('role', { required: true })}
                      value={selectedRole}
                      onChange={handleRoleChange}
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-200"
                    >
                      <option value="" disabled>
                        {t('staffScreen.drawer.selectRole')}
                      </option>
                      {roles.map((r) => (
                        <option key={r._id} value={r._id}>
                          {r.name}
                        </option>
                      ))}
                    </select>

                    <Error errorName={errors.role} />
                  </div>
                </div>
              </div>

              <DrawerButton id={id} title="Staff" zIndex="z-5" isSubmitting={isSubmitting} />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  )
}

export default StaffDrawer
