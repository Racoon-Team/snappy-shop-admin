import React from 'react'
import { TableBody, TableCell, TableRow, Badge } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'

const StockTable = ({ products }) => {
  const { t } = useTranslation()

  return (
    <TableBody>
      {products && products.length > 0 ? (
        products.map((stock) => (
          <TableRow key={stock._id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">{stock._id?.toString().slice(5, 8)}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{stock.productName}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{stock.category}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{new Date(stock.createdAt).toLocaleDateString()}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{stock.type}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{stock.quantity}</span>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="text-center text-gray-500">
            {t('productsScreen.drawer.table.thereAreNoProducts')}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

export default StockTable
