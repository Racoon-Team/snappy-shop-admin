import { TableBody, TableCell, TableRow } from '@windmill/react-ui'
import React from 'react'
import type { ChangeEvent } from 'react'

//internal import
import CheckBox from '@/components/form/others/CheckBox'
import useToggleDrawer from '@/hooks/useToggleDrawer'
import DeleteModal from '@/components/modal/DeleteModal'
import MainDrawer from '@/components/drawer/MainDrawer'
import CurrencyDrawer from '@/components/drawer/CurrencyDrawer'
import EditDeleteButton from '@/components/table/EditDeleteButton'
import ShowHideButton from '@/components/table/ShowHideButton'

interface Currency {
  id: string
  name: string
  symbol: string
  status: string
  iso_code?: string
}

interface CurrencyTableProps {
  currency: Currency[]
  isCheck: string[]
  setIsCheck: React.Dispatch<React.SetStateAction<string[]>>
}

const CurrencyTable: React.FC<CurrencyTableProps> = ({ currency, isCheck, setIsCheck }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer()

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target

    if (checked) {
      setIsCheck([...isCheck, id])
    } else {
      setIsCheck(isCheck.filter((item) => item !== id))
    }
  }

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      <MainDrawer>
        <CurrencyDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {currency?.map((currency) => (
          <TableRow key={currency.id}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={currency.symbol}
                id={currency.id}
                handleClick={handleClick}
                isChecked={isCheck.includes(currency.id)}
              />
            </TableCell>

            <TableCell className="text-center">
              <span className="font-medium text-sm">{currency.name}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="font-medium text-sm">{currency.symbol}</span>
            </TableCell>

            <TableCell className="text-center">
              <ShowHideButton id={currency.id} status={currency.status} currencyStatusName="status" />
            </TableCell>

            <TableCell>
              <EditDeleteButton
                title={currency.name}
                id={currency.id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  )
}

export default CurrencyTable
