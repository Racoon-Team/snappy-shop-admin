import requests from './httpService'

const StockServices = {
  getAllStocks: async ({ productName = '', category = '' }) => {
    return requests.get(`/stock?productName=${productName}&category=${category}`)
  },
  addStock: async (body) => {
    return requests.post('/stock/add', body)
  },
  getStockById: async (id) => {
    return requests.get(`/stock/${id}`)
  },
  getStocksByProductId: async (id) => {
    return requests.get(`/stock/product/${id}`)
  },
  getStockTotals: async (productId) => {
    return requests.get(`/stock/totals/${productId}`)
  },
}

export default StockServices
