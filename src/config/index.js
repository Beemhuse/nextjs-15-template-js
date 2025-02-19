import axios from 'axios'
import { Cookies } from 'react-cookie'
export const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

export default function init() {
  axios.defaults.baseURL = API_URL
  axios.defaults.withCredentials = false
  const cookies = new Cookies()
  const accessValue = cookies.get('your-token')
  if (accessValue) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessValue}`
  }

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 401) {
        // if (typeof window !== 'undefined') {
        //   // Ensure this only runs on the client
        // }
        window.location.href = '/login' // Redirect to the login page
      }
      return Promise.reject(error)
    },
  )
}
