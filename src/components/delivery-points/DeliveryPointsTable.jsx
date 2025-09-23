import { Badge, TableBody, TableCell, TableRow } from '@windmill/react-ui'
import React from 'react'
import EditDeleteButton from '@/components/table/EditDeleteButton'
import useUtilsFunction from '@/hooks/useUtilsFunction'
import { useTranslation } from 'react-i18next'

const DeliveryPointsTable = ({ points, availableLocations = [], handleUpdate, handleModalOpen }) => {
  const { currency, getNumberTwo } = useUtilsFunction()
  const { t } = useTranslation()

  return (
    <TableBody>
      {points?.map((point) => {
        const locationLabel = availableLocations.find((loc) => loc.key === point.location)?.label || point.location

        return (
          <TableRow key={point.id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">{point.id?.toString().slice(0, 3)}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{locationLabel}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{point.placeName}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{point.streetName}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{point.details}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">
                {point.shippingCost <= 0 ? (
                  <Badge type="success">{t('deliveryPointsScreen.table.free')}</Badge>
                ) : (
                  <>
                    {currency} {getNumberTwo(point.shippingCost)}
                  </>
                )}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <EditDeleteButton
                id={point.id}
                title={point.placeName}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default DeliveryPointsTable
