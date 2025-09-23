import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { Button, TableContainer, Table, TableHeader, TableCell, TableFooter, Pagination } from '@windmill/react-ui'

import Title from '@/components/form/others/Title'
import LabelArea from '@/components/form/selectOption/LabelArea'
import InputArea from '@/components/form/input/InputArea'
import Error from '@/components/form/others/Error'
import useStock from '@/hooks/useStock'
import StockTable from '@/components/stock/StockTable'
import SwitchToggle from '@/components/form/switch/SwitchToggle'
import useFilter from '@/hooks/useFilter'
import OrderServices from '@/services/OrderServices'

const StockDrawer = ({ id, onSuccess }) => {
  const { t } = useTranslation()
  const [isRemoveProduct, setIsRemoveProduct] = useState(false)
  const [orderOutbound, setOrderOutbound] = useState(0)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()
  const { stocks, totals, addStock } = useStock(id)
  const { dataTable, totalResults, resultsPerPage, handleChangePage } = useFilter(stocks)

  useEffect(() => {
    const fetchOrderOutbound = async () => {
      try {
        if (id) {
          const res = await OrderServices.getTotalSoldByProduct(id)
          setOrderOutbound(res?.totalQuantity || 0)
        }
      } catch (err) {
        console.error('Error fetching order outbound:', err)
      }
    }
    fetchOrderOutbound()
  }, [id])

  const inbound = totals.inbound || 0
  const outbound = (totals.outbound || 0) + orderOutbound
  const stockTotal = (inbound || 0) - (outbound || 0)

  const onSubmit = async (formData) => {
    try {
      const quantity = Number(formData.quantity)
      await addStock({
        productId: id,
        quantity: Math.abs(quantity),
        type: isRemoveProduct ? 'outbound' : 'inbound',
      })
      reset()
      if (onSuccess) onSuccess()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <Title
          title={t('productsScreen.drawer.titleAddQuantity')}
          description={t('productsScreen.drawer.titleDescriptionQuantity')}
        />
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full">
            <LabelArea label={`${t('productsScreen.drawer.inbound')} ${inbound}`} />
            <LabelArea label={`${t('productsScreen.drawer.outbound')} ${outbound}`} />
            <LabelArea label={`${t('productsScreen.drawer.stockTotal')} ${stockTotal}`} />
            <br />
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label className="block text-sm text-gray-600 font-semibold dark:text-gray-400 mb-1 sm:col-span-2">
                {t('productsScreen.drawer.labelRemove')}
              </label>
              <div className="md:col-span-3 sm:col-span-4">
                <SwitchToggle title={''} handleProcess={setIsRemoveProduct} processOption={isRemoveProduct} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 items-end">
              <LabelArea label={t('productsScreen.drawer.labelQuantity')} />
              <div className="col-span-8 sm:col-span-4 flex gap-2">
                <InputArea
                  register={register}
                  name="quantity"
                  placeholder={t('productsScreen.drawer.inputQuantity')}
                  type="number"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mx-2 hover:opacity-90"
                  style={{ backgroundColor: isRemoveProduct ? 'rgba(220, 53, 69, 1)' : 'rgb(47, 133, 90)' }}
                >
                  <span className="text-xs">
                    {isRemoveProduct
                      ? t('productsScreen.drawer.buttonremove')
                      : t('productsScreen.drawer.buttonQuantity')}
                  </span>
                </Button>
              </div>
              <Error errorName={errors.quantity} />
            </div>
            <h3 className="text-lg font-semibold mb-4">{t('productsScreen.drawer.titleTable')}</h3>
            <TableContainer className="mb-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>{t('productsScreen.drawer.table.id')}</TableCell>
                    <TableCell>{t('productsScreen.drawer.table.productName')}</TableCell>
                    <TableCell>{t('productsScreen.drawer.table.category')}</TableCell>
                    <TableCell>{t('productsScreen.drawer.table.date')}</TableCell>
                    <TableCell>{t('productsScreen.drawer.table.type')}</TableCell>
                    <TableCell>{t('productsScreen.drawer.table.quantity')}</TableCell>
                  </tr>
                </TableHeader>
                <StockTable products={dataTable} />
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
          </div>
        </form>
      </Scrollbars>
    </>
  )
}

export default StockDrawer
