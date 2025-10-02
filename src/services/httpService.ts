import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import Cookies from 'js-cookie'

interface AdminInfo {
  token: string
}

const baseURL: string = `${import.meta.env.VITE_APP_API_BASE_URL}`
const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  let adminInfo: AdminInfo | null = null
  const adminInfoCookie = Cookies.get('adminInfo')

  if (adminInfoCookie) {
    try {
      adminInfo = JSON.parse(adminInfoCookie) as AdminInfo
    } catch (error) {
      console.error('Error parsing adminInfo cookie:', error)
    }
  }

  let company: string | undefined = Cookies.get('company')
  if (adminInfo) {
    config.headers['authorization'] = `Bearer ${adminInfo.token}`
  }
  if (company) {
    config.headers['company'] = company
  }
  return config
})

const responseBody = <T>(response: AxiosResponse<T>): T => response.data

interface Requests {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>

  post: <T>(url: string, body: unknown) => Promise<T>

  put: <T>(url: string, body: unknown, config?: AxiosRequestConfig) => Promise<T>

  patch: <T>(url: string, body: unknown) => Promise<T>

  delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>
}

const requests: Requests = {
  get: <T>(url: string, config?: AxiosRequestConfig) => instance.get<T>(url, config).then(responseBody),

  post: <T>(url: string, body: unknown) => instance.post<T>(url, body).then(responseBody),

  put: <T>(url: string, body: unknown, config?: AxiosRequestConfig) =>
    instance.put<T>(url, body, config).then(responseBody),

  patch: <T>(url: string, body: unknown) => instance.patch<T>(url, body).then(responseBody),

  delete: <T>(url: string, config?: AxiosRequestConfig) => instance.delete<T>(url, config).then(responseBody),
}

export default requests
