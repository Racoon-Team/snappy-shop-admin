import { Badge } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'

const Status = ({ status }) => {
  const { t } = useTranslation()
  return (
    <>
      <span className="font-serif">
        {status === 'Pending' && <Badge type="warning">{t('ordersScreen.status.orderPending')}</Badge>}

        {status === 'Inactive' && <Badge type="warning">{t('staffScreen.status.inactive')}</Badge>}

        {status === 'Waiting for Password Reset' && <Badge type="warning">{status}</Badge>}

        {status === 'Processing' && <Badge>{t('ordersScreen.status.orderProcessing')}</Badge>}

        {status === 'Delivered' && <Badge type="success">{t('ordersScreen.status.orderDelivered')}</Badge>}

        {status === 'Active' && <Badge type="success">{t('staffScreen.status.active')}</Badge>}

        {status === 'Cancel' && <Badge type="danger">{t('ordersScreen.status.orderCancel')}</Badge>}

        {status === 'POS-Completed' && <Badge className="dark:bg-teal-900 bg-teal-100">{status}</Badge>}
      </span>
    </>
  )
}

export default Status
