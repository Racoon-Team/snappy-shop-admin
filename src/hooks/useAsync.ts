import axios from 'axios'
// import Cookies from 'js-cookie';
import { SidebarContext } from '@/context/SidebarContext'
import { useContext, useEffect, useState } from 'react'

function useAsync<T>(asyncFunction: (params?: any) => Promise<T>) {
  const [data, setData] = useState<T | []>([])
  const [error, setError] = useState<string>('')
  // const [errCode, setErrCode] = useState('');
  const [loading, setLoading] = useState<boolean>(true)

  const {
    invoice,
    status,
    zone,
    time,
    source,
    limitData,
    startDate,
    endDate,
    method,
    isUpdate,
    setIsUpdate,
    currentPage,
    category,
    searchText,
    sortedField,
  } = useContext(SidebarContext)

  useEffect(() => {
    let unmounted = false
    const sourceToken = axios.CancelToken.source()

    ;(async () => {
      try {
        const res = await asyncFunction({ cancelToken: sourceToken.token })
        if (!unmounted) {
          setData(res)
          setError('')
        }
      } catch (err: any) {
        if (!unmounted) {
          setError(err.message)
          if (axios.isCancel(err)) {
            setError(err.message)
            setLoading(false)
            setData([])
          } else {
            setError(err.message)
            setLoading(false)
            setData([])
          }
        }
      } finally {
        if (!unmounted) setLoading(false)
      }
    })()

    setIsUpdate(false)

    return () => {
      unmounted = true
      sourceToken.cancel('Cancelled in cleanup')
    }
  }, [
    invoice,
    status,
    zone,
    time,
    method,
    source,
    limitData,
    startDate,
    endDate,
    isUpdate,
    currentPage,
    category,
    searchText,
    sortedField,
  ])

  return {
    data,
    error,
    loading,
  }
}

export default useAsync
