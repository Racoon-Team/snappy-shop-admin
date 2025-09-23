import { useState, useEffect, useCallback } from 'react'
import StockServices from '@/services/StockServices'

const useStock = (productId) => {
  const [stocks, setStocks] = useState([])
  const [totals, setTotals] = useState({ inbound: 0, outbound: 0, stockTotal: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchStocks = useCallback(async (id) => {
    if (!id) return
    try {
      setLoading(true)
      const res = await StockServices.getStocksByProductId(id)
      const data = res?.data || res || []
      setStocks(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Error fetching stocks')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchTotals = useCallback(async (id) => {
    if (!id) return
    try {
      setLoading(true)
      const res = await StockServices.getStockTotals(id)
      const data = res?.data || res
      setTotals(data && typeof data === 'object' ? data : { inbound: 0, outbound: 0, stockTotal: 0 })
    } catch (err) {
      setError(err.message || 'Error fetching totals')
    } finally {
      setLoading(false)
    }
  }, [])

  const addStock = useCallback(
    async (body) => {
      if (!productId) throw new Error('Product ID is required to add stock')
      try {
        setLoading(true)
        await StockServices.addStock(body)
        await fetchStocks(productId)
        await fetchTotals(productId)
      } catch (err) {
        setError(err.message || 'Error adding stock')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [productId, fetchStocks, fetchTotals]
  )

  useEffect(() => {
    if (productId) {
      fetchStocks(productId)
      fetchTotals(productId)
    }
  }, [productId, fetchStocks, fetchTotals])

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
