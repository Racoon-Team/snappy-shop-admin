import { useState, useEffect, useCallback } from 'react'
import StockServices from '@/services/StockServices'

const useStock = (productId, variantId = null) => {
  const [stocks, setStocks] = useState([])
  const [totals, setTotals] = useState({ inbound: 0, outbound: 0, stockTotal: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchStocks = useCallback(async () => {
    if (!productId) return
    try {
      setLoading(true)
      const res = await StockServices.getStocksByProductId(productId, variantId)
      const data = res?.data || res || []
      setStocks(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Error fetching stocks')
    } finally {
      setLoading(false)
    }
  }, [productId, variantId])

  const fetchTotals = useCallback(async () => {
    if (!productId) return
    try {
      setLoading(true)
      const res = await StockServices.getStockTotals(productId, variantId)
      const data = res?.data || res
      setTotals(
        data && typeof data === 'object'
          ? {
              inbound: data.inbound || 0,
              outbound: data.outbound || 0,
              stockTotal: data.stockTotal || 0,
            }
          : { inbound: 0, outbound: 0, stockTotal: 0 }
      )
    } catch (err) {
      setError(err.message || 'Error fetching totals')
    } finally {
      setLoading(false)
    }
  }, [productId, variantId])

  const addStock = useCallback(
    async ({ quantity, type }) => {
      if (!productId) throw new Error('Product ID is required to add stock')
      try {
        setLoading(true)
        await StockServices.addStock({
          productId,
          variantId,
          quantity: Math.abs(quantity),
          type: type === 'outbound' ? 'outbound' : 'inbound',
        })
        await fetchStocks()
        await fetchTotals()
      } catch (err) {
        setError(err.message || 'Error adding stock')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [productId, variantId, fetchStocks, fetchTotals]
  )

  useEffect(() => {
    fetchStocks()
    fetchTotals()
  }, [fetchStocks, fetchTotals])

  return {
    stocks,
    totals,
    loading,
    error,
    fetchStocks,
    fetchTotals,
    addStock,
  }
}

export default useStock
