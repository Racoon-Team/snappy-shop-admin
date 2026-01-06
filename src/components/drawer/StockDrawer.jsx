import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { Button, TableContainer, Table, TableHeader, TableCell, TableFooter, Pagination } from '@windmill/react-ui'
import { Tab, TabList, TabPanel, Tabs as TabsComponent } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import Title from '@/components/form/others/Title'
import LabelArea from '@/components/form/selectOption/LabelArea'
import InputArea from '@/components/form/input/InputArea'
import Error from '@/components/form/others/Error'
import useStock from '@/hooks/useStock'
import StockTable from '@/components/stock/StockTable'
import useFilter from '@/hooks/useFilter'
import OrderServices from '@/services/OrderServices'
import ProductServices from '@/services/ProductServices'

const StockDrawer = ({ id, onSuccess }) => {
  const { t } = useTranslation()
  const [isRemoveProduct, setIsRemoveProduct] = useState(false)
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [product, setProduct] = useState(null)
  const [variantTotals, setVariantTotals] = useState({})
  const [totals, setTotals] = useState({ inbound: 0, outbound: 0, stockTotal: 0 })
  const [orderOutbound, setOrderOutbound] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()
  const { stocks, addStock } = useStock(id)
  const { dataTable, totalResults, resultsPerPage, handleChangePage } = useFilter(stocks)

  const hasVariants = product?.variants?.length > 0

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return
      try {
        const res = await ProductServices.getProductById(id)
        setProduct(res)
      } catch (err) {
        console.error('Error fetching product:', err)
      }
    }
    fetchProduct()
  }, [id])

  useEffect(() => {
    const fetchOrderOutbound = async () => {
      if (!id) return
      try {
        const res = await OrderServices.getTotalSoldByProduct(id)
        setOrderOutbound(res?.totalQuantity || 0)
      } catch (err) {
        console.error('Error fetching order outbound:', err)
      }
    }
    fetchOrderOutbound()
  }, [id])

  const fetchVariantTotals = async () => {
    if (!product || !hasVariants) return
    const totalsObj = {}
    for (const variant of product.variants) {
      try {
        const res = await ProductServices.getStockTotals(product._id, variant.productId)
        totalsObj[variant.productId] = res
      } catch (err) {
        console.error(`Error fetching totals for variant ${variant.productId}:`, err)
      }
    }
    setVariantTotals(totalsObj)
  }

  useEffect(() => {
    fetchVariantTotals()
  }, [product])

  const fetchTotals = async () => {
    if (!product || hasVariants) return
    try {
      const res = await ProductServices.getStockTotals(id)
      setTotals({
        inbound: res.inbound,
        outbound: (res.outbound || 0) + orderOutbound,
        stockTotal: res.inbound - ((res.outbound || 0) + orderOutbound),
      })
    } catch (err) {
      console.error('Error fetching totals:', err)
    }
  }

  useEffect(() => {
    fetchTotals()
  }, [product, stocks, orderOutbound])

  const onSubmit = async (formData) => {
    try {
      const quantity = Number(formData.quantity)
      const variantId = hasVariants ? product.variants[activeTabIndex]?.productId : undefined

      await addStock({
        productId: id,
        variantId,
        quantity: Math.abs(quantity),
        type: isRemoveProduct ? 'outbound' : 'inbound',
      })

      reset()
      if (hasVariants) {
        await fetchVariantTotals()
      } else {
        await fetchTotals()
      }

      if (onSuccess) onSuccess()
    } catch (err) {
      console.error(err)
    }
  }

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-center text-gray-500 dark:text-gray-300">
          {t('productsScreen.drawer.loadingProduct') || 'Cargando producto...'}
        </p>
      </div>
    )
  }

  const variants = product.variants || []

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
            {hasVariants && (
              <TabsComponent
                className="mb-6"
                selectedIndex={activeTabIndex}
                onSelect={(index) => setActiveTabIndex(index)}
              >
                <TabList>
                  {variants.map((variant, index) => (
                    <Tab key={variant.productId || index}>Variante {index + 1}</Tab>
                  ))}
                </TabList>
              </TabsComponent>
            )}
            <div className="mb-6">
              <p className="block text-sm text-gray-600 font-semibold dark:text-gray-400 mb-2">Seleccionar acción</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsRemoveProduct(false)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{
                    backgroundColor: !isRemoveProduct ? 'rgb(47, 133, 90)' : 'rgba(0,0,0,0.25)',
                  }}
                >
                  {t('productsScreen.drawer.buttonQuantity')}
                </button>

                <button
                  type="button"
                  onClick={() => setIsRemoveProduct(true)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{
                    backgroundColor: isRemoveProduct ? 'rgba(220, 53, 69, 1)' : 'rgba(0,0,0,0.25)',
                  }}
                >
                  {t('productsScreen.drawer.buttonremove')}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 mb-6 items-end">
              <div className="col-span-8 sm:col-span-4 flex gap-2">
                <InputArea
                  label={t('productsScreen.drawer.labelQuantity')}
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
                  style={{
                    backgroundColor: isRemoveProduct ? 'rgba(220, 53, 69, 1)' : 'rgb(47, 133, 90)',
                  }}
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
            {hasVariants ? (
              <TabsComponent selectedIndex={activeTabIndex}>
                {variants.map((variant, index) => (
                  <TabPanel key={variant.productId || index}>
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-4">Variante {index + 1}</h3>

                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={variant.image}
                          alt={`Variante ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                        <div>
                          <p>
                            <strong>Product ID:</strong> {variant.productId}
                          </p>
                          <p>
                            <strong>Cantidad:</strong> {variant.quantity}
                          </p>
                        </div>
                      </div>

                      <LabelArea
                        label={`${t('productsScreen.drawer.inbound')} ${variantTotals[variant.productId]?.inbound || 0}`}
                      />
                      <LabelArea
                        label={`${t('productsScreen.drawer.outbound')} ${variantTotals[variant.productId]?.outbound || 0}`}
                      />
                      <LabelArea
                        label={`${t('productsScreen.drawer.stockTotal')} ${variantTotals[variant.productId]?.stockTotal || 0}`}
                      />

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

                          <StockTable products={dataTable.filter((p) => p.variantId === variant.productId)} />
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
                  </TabPanel>
                ))}
              </TabsComponent>
            ) : (
              <div className="mt-8">
                <LabelArea label={`${t('productsScreen.drawer.inbound')} ${totals.inbound}`} />
                <LabelArea label={`${t('productsScreen.drawer.outbound')} ${totals.outbound}`} />
                <LabelArea label={`${t('productsScreen.drawer.stockTotal')} ${totals.stockTotal}`} />

                <TableContainer className="mb-8 mt-4">
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
            )}
          </div>
        </form>
      </Scrollbars>
    </>
  )
}

export default StockDrawer
