import {
  Card,
  Button,
  CardBody,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  Select,
} from '@windmill/react-ui'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'

import PageTitle from '@/components/Typography/PageTitle'
import AnimatedContent from '@/components/common/AnimatedContent'

import TableLoading from '@/components/preloader/TableLoading'
import NotFound from '@/components/table/NotFound'
import MainDrawer from '@/components/drawer/MainDrawer'
// import DeliveryPointsDrawer from '@/components/drawer/DeliveryPointsDrawer'

import { SidebarContext } from '@/context/SidebarContext'
import DeleteModal from '@/components/modal/DeleteModal'
import useToggleDrawer from '@/hooks/useToggleDrawer'
import useFilter from '@/hooks/useFilter'
import RoleTable from '@/components/role-settings/RoleSettingsTable'
import RoleServices from '@/services/RoleServices'
import RoleDrawer from '@/components/drawer/RoleDrawer'

const RoleSettings = () => {
  const { t } = useTranslation()
  const { toggleDrawer, isUpdate, setIsUpdate } = useContext(SidebarContext)

  const [roles, setRoles] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRoles = async () => {
    try {
      setLoading(true)
      const data = await RoleServices.getRoles()
      setRoles(data)
    } catch (err) {
      setError('Error loading Roles')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  useEffect(() => {
    if (isUpdate) {
      fetchRoles()
      setIsUpdate(false)
    }
  }, [isUpdate, setIsUpdate])

  const { dataTable, totalResults, resultsPerPage, handleChangePage } = useFilter(roles)

  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer()

  return (
    <>
      <PageTitle>{t('roleScreen.label')}</PageTitle>
      <MainDrawer>
        <RoleDrawer id={serviceId} />
      </MainDrawer>
      <DeleteModal id={serviceId} title={title} />
      <AnimatedContent>
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <div className="flex items-center">
              <Button onClick={toggleDrawer} className="h-12 w-40 bg-emerald-700">
                <span className="mr-2">
                  <FiPlus />
                </span>
                {t('roleScreen.addBtn')}
              </Button>
            </div>
          </CardBody>
        </Card>
      </AnimatedContent>

      {loading ? (
        <TableLoading row={12} col={6} width={190} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : dataTable?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t('roleScreen.table.name')}</TableCell>
                <TableCell>{t('roleScreen.table.permissions')}</TableCell>
                <TableCell>{t('roleScreen.table.actions')}</TableCell>
              </tr>
            </TableHeader>
            <RoleTable roles={dataTable} handleUpdate={handleUpdate} handleModalOpen={handleModalOpen} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Roles Not Found" />
      )}
    </>
  )
}

export default RoleSettings
