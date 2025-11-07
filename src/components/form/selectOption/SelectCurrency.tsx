import { Select } from '@windmill/react-ui'

//internal import
import useAsync from '@/hooks/useAsync'
import CurrencyServices from '@/services/CurrencyServices'

interface SelectCurrencyProps {
  register: any
  name: string
  label: string
  required?: boolean
}

const SelectCurrency: React.FC<SelectCurrencyProps> = ({ register, name, label, required }) => {
  const { data, loading } = useAsync(CurrencyServices.getShowingCurrency)

  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <Select
          name={name}
          {...register(`${name}`, {
            required: required ? `${label} is required!` : false,
          })}
        >
          {data?.map((currency) => (
            <option key={currency.id} value={`${currency.symbol}`}>
              {currency?.name}
            </option>
          ))}
        </Select>
      )}
    </>
  )
}

export default SelectCurrency
