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
import DeliveryPointsTable from '@/components/delivery-points/DeliveryPointsTable'
import TableLoading from '@/components/preloader/TableLoading'
import NotFound from '@/components/table/NotFound'
import MainDrawer from '@/components/drawer/MainDrawer'
import DeliveryPointsDrawer from '@/components/drawer/DeliveryPointsDrawer'

import SettingServices from '@/services/SettingServices'
import { SidebarContext } from '@/context/SidebarContext'
import DeleteModal from '@/components/modal/DeleteModal'
import useToggleDrawer from '@/hooks/useToggleDrawer'
import AdminServices from '@/services/AdminServices'
import useFilter from '@/hooks/useFilter'

const DeliveryPoints = () => {
  const { t } = useTranslation()
  const { toggleDrawer } = useContext(SidebarContext)

  const [deliveryPoints, setDeliveryPoints] = useState([])
  const [filteredPoints, setFilteredPoints] = useState([])
  const [locations, setLocations] = useState([])
  const [loadingLocations, setLoadingLocations] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDeliveryPoints = async () => {
    try {
      setLoading(true)
      const data = await SettingServices.getDeliveryPoints()
      setDeliveryPoints(data)
      setFilteredPoints(data)
    } catch (err) {
      setError(t('deliveryPointsScreen.message.notifyError'))
    } finally {
      setLoading(false)
    }
  }

  const fetchLocations = async () => {
    try {
      const data = await AdminServices.getAvailableLocations()
      setLocations(data)
    } catch (err) {
      console.error('Error getting locations', err)
    } finally {
      setLoadingLocations(false)
    }
  }

  useEffect(() => {
    fetchDeliveryPoints()
    fetchLocations()
  }, [])

  const { dataTable, totalResults, resultsPerPage, handleChangePage } = useFilter(filteredPoints)

  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer()

  const handleFilter = (e) => {
    e.preventDefault()
    if (selectedLocation) {
      const filtered = deliveryPoints.filter((point) => point.location === selectedLocation)
      setFilteredPoints(filtered)
    } else {
      setFilteredPoints(deliveryPoints)
    }
  }

  const handleReset = () => {
    setSelectedLocation('')
    setFilteredPoints(deliveryPoints)
  }

  return (
    <>
      <PageTitle>{t('deliveryPointsScreen.title')}</PageTitle>
      <MainDrawer>
        <DeliveryPointsDrawer id={serviceId} onSuccess={fetchDeliveryPoints} />
      </MainDrawer>

      <AnimatedContent>
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <form onSubmit={handleFilter} className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
              <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <div className="w-full mx-1">
                  <Select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    disabled={loadingLocations}
                    className="px-4 md:py-1 py-2 h-12 text-sm dark:bg-gray-700"
                  >
                    <option value="">{t('deliveryPointsScreen.select')}</option>
                    {locations.map((loc) => (
                      <option key={loc.key} value={loc.key}>
                        {loc.label}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="w-full mx-1">
                  <Button type="submit" className="h-12 w-full bg-emerald-700">
                    {t('common.filter')}
                  </Button>
                </div>

                <div className="w-full mx-1">
                  <Button
                    layout="outline"
                    type="button"
                    onClick={handleReset}
                    className="px-4 md:py-1 py-2 h-12 text-sm dark:bg-gray-700"
                  >
                    <span className="text-black dark:text-gray-200">{t('common.reset')}</span>
                  </Button>
                </div>

                <div className="w-full mx-1">
                  <Button onClick={toggleDrawer} className="h-12 w-full bg-emerald-700">
                    <span className="mr-2">
                      <FiPlus />
                    </span>
                    {t('deliveryPointsScreen.addDeliveryPointsBtn')}
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </AnimatedContent>

      <DeleteModal id={serviceId} title={title} onSuccess={fetchDeliveryPoints} />

      {loading ? (
        <TableLoading row={12} col={6} width={190} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : dataTable?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t('deliveryPointsScreen.table.id')}</TableCell>
                <TableCell>{t('deliveryPointsScreen.table.location')}</TableCell>
                <TableCell>{t('deliveryPointsScreen.table.place')}</TableCell>
                <TableCell>{t('deliveryPointsScreen.table.street')}</TableCell>
                <TableCell>{t('deliveryPointsScreen.table.details')}</TableCell>
                <TableCell>{t('deliveryPointsScreen.table.shipingCost')}</TableCell>
                <TableCell className="text-right">{t('deliveryPointsScreen.table.actions')}</TableCell>
              </tr>
            </TableHeader>
            <DeliveryPointsTable
              points={dataTable}
              availableLocations={locations}
              handleUpdate={handleUpdate}
              handleModalOpen={handleModalOpen}
            />
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
        <NotFound title={t('deliveryPointsScreen.noDeliveryPoints')} />
      )}
    </>
  )
}

export default DeliveryPoints
