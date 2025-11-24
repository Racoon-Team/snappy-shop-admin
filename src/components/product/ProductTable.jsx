import { Avatar, Badge, TableBody, TableCell, TableRow } from '@windmill/react-ui'
import { FiZoomIn, FiPlusCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// internal import
import MainDrawer from '@/components/drawer/MainDrawer'
import ProductDrawer from '@/components/drawer/ProductDrawer'
import CheckBox from '@/components/form/others/CheckBox'
import DeleteModal from '@/components/modal/DeleteModal'
import EditDeleteButton from '@/components/table/EditDeleteButton'
import ShowHideButton from '@/components/table/ShowHideButton'
import Tooltip from '@/components/tooltip/Tooltip'
import useToggleDrawer from '@/hooks/useToggleDrawer'
import useUtilsFunction from '@/hooks/useUtilsFunction'
import StockDrawer from '../drawer/StockDrawer'
import useStock from '@/hooks/useStock'
import OrderServices from '@/services/OrderServices'

const ProductTable = ({ products, isCheck, setIsCheck }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer()
  const { currency, showingTranslateValue, getNumberTwo } = useUtilsFunction()
  const { t } = useTranslation()
  const handleClick = (e) => {
    const { id, checked } = e.target
    setIsCheck([...isCheck, id])
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id))
    }
  }
  const [totalsMap, setTotalsMap] = useState({})
  const [orderOutboundMap, setOrderOutboundMap] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const newTotals = {}
      const newOutbound = {}

      for (const product of products) {
        try {
          const stockRes = await OrderServices.getProductStock(product._id)
          newTotals[product._id] = stockRes?.totals || {}
        } catch (err) {
          newTotals[product._id] = {}
        }

        try {
          const outRes = await OrderServices.getTotalSoldByProduct(product._id)
          newOutbound[product._id] = outRes?.totalQuantity || 0
        } catch (err) {
          newOutbound[product._id] = 0
        }
      }

      setTotalsMap(newTotals)
      setOrderOutboundMap(newOutbound)
    }

    fetchData()
  }, [products])

  return (
    <>
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          {title === 'ADD STOCK' ? (
            <StockDrawer id={serviceId} onSuccess={() => {}} />
          ) : (
            <ProductDrawer currency={currency} id={serviceId} />
          )}
        </MainDrawer>
      )}

      <TableBody>
        {products?.map((product, i) => {
          const totals = totalsMap[product._id] || {}
          const orderOutbound = orderOutboundMap[product._id] || 0

          const inbound = totals?.inbound || 0
          const outbound = (totals?.outbound || 0) + orderOutbound
          const stockTotal = inbound - outbound

          return (
            <TableRow key={i + 1}>
              <TableCell>
                <CheckBox
                  type="checkbox"
                  name={product?.title?.en}
                  id={product._id}
                  handleClick={handleClick}
                  isChecked={isCheck?.includes(product._id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  {product?.image[0] ? (
                    <Avatar
                      className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                      src={product?.image[0]}
                      alt="product"
                    />
                  ) : (
                    <Avatar
                      src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                      alt="product"
                    />
                  )}
                  <div>
                    <h2 className={`text-sm font-medium ${product?.title.length > 30 ? 'wrap-long-title' : ''}`}>
                      {showingTranslateValue(product?.title)?.substring(0, 28)}
                    </h2>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">{showingTranslateValue(product?.category?.name)}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-semibold">
                  {currency}
                  {product?.isCombination
                    ? getNumberTwo(product?.variants[0]?.originalPrice)
                    : getNumberTwo(product?.prices?.originalPrice)}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-semibold">
                  {currency}
                  {product?.isCombination
                    ? getNumberTwo(product?.variants[0]?.price)
                    : getNumberTwo(product?.prices?.price)}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-semibold">{stockTotal}</span>
              </TableCell>

              <TableCell className="text-center">
                <button
                  onClick={() => handleUpdate(product._id, 'ADD STOCK', product)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Tooltip
                    id={`add-stock-${product._id}`}
                    Icon={FiPlusCircle}
                    bgColor="rgba(59, 130, 246, 1)"
                    title={t('productsScreen.table.addQuantity')}
                  />
                </button>
              </TableCell>

              <TableCell>
                {stockTotal > 0 ? (
                  <Badge type="success">{t('productsScreen.drawer.selling')}</Badge>
                ) : (
                  <Badge type="danger">{t('productsScreen.drawer.soldOut')}</Badge>
                )}
              </TableCell>
              <TableCell>
                <Link
                  to={`/product/${product._id}`}
                  className="flex justify-center text-gray-400 hover:text-emerald-600"
                >
                  <Tooltip id="view" Icon={FiZoomIn} title={t('DetailsTbl')} bgColor="#10B981" />
                </Link>
              </TableCell>
              <TableCell className="text-center">
                <ShowHideButton id={product._id} status={product.status} />
              </TableCell>
              <TableCell>
                <EditDeleteButton
                  id={product._id}
                  product={product}
                  isCheck={isCheck}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                  title={showingTranslateValue(product?.title)}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </>
  )
}

export default ProductTable
