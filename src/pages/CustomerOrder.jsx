import React from 'react'
import { useParams } from 'react-router-dom'
import { Table, TableHeader, TableCell, TableFooter, TableContainer, Pagination } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'
import { IoBagHandle } from 'react-icons/io5'

//internal import
import useAsync from '@/hooks/useAsync'
import OrderServices from '@/services/OrderServices'
import useFilter from '@/hooks/useFilter'
import PageTitle from '@/components/Typography/PageTitle'
import Loading from '@/components/preloader/Loading'
import CustomerOrderTable from '@/components/customer/CustomerOrderTable'

const CustomerOrder = () => {
  const { id } = useParams()
  const { t } = useTranslation()

  const { data, loading, error } = useAsync(() => OrderServices.getOrderCustomer(id))

  const { handleChangePage, totalResults, resultsPerPage, dataTable } = useFilter(data)

  return (
    <>
      <PageTitle>{t('customerScreen.viewOrder.label')}</PageTitle>

      {loading && <Loading loading={loading} />}
      {!error && !loading && dataTable.length === 0 && (
        <div className="w-full bg-white rounded-md dark:bg-gray-800">
          <div className="p-8 text-center">
            <span className="flex justify-center my-30 text-red-500 font-semibold text-6xl">
              <IoBagHandle />
            </span>
            <h2 className="font-medium text-base mt-4 text-gray-600">{t('CustomerOrderEmpty')}</h2>
          </div>
        </div>
      )}

      {data.length > 0 && !error && !loading ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell> {t('customerScreen.viewOrder.table.orderId')} </TableCell>
                <TableCell>{t('customerScreen.viewOrder.table.time')}</TableCell>
                <TableCell>{t('customerScreen.viewOrder.table.shippingAdress')}</TableCell>
                <TableCell>{t('customerScreen.viewOrder.table.phone')} </TableCell>
                <TableCell>{t('customerScreen.viewOrder.table.method')} </TableCell>
                <TableCell>{t('customerScreen.viewOrder.table.amount')}</TableCell>
                <TableCell className="text-center"> {t('customerScreen.viewOrder.table.status')} </TableCell>
                <TableCell className="text-center">{t('customerScreen.viewOrder.table.action')}</TableCell>
              </tr>
            </TableHeader>
            <CustomerOrderTable orders={dataTable} />
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
      ) : null}
    </>
  )
}

export default CustomerOrder
