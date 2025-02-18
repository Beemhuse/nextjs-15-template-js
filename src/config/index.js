import axios from 'axios'
// import { removeCookies } from '../lib/utils/removeCookie';
export const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

export default function init() {
  // Set the base URL and ensure credentials are handled correctly
  axios.defaults.baseURL = API_URL
  axios.defaults.withCredentials = false

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY // Assuming you have the API key in your environment variables

  if (!API_KEY) {
    console.error('API key is missing in environment variables.')
    return
  }

  // Append the API key to every request URL as a query parameter
  axios.interceptors.request.use(
    (config) => {
      // Check if the URL is not already appended with an API key
      if (config.url && !config.url.includes('api_key')) {
        const url = new URL(config.baseURL + config.url)
        url.searchParams.append('api_key', API_KEY) // Append API key to query params
        config.url = url.origin + url.pathname + url.search // Update the config URL with new query params
      }

      return config
    },
    (error) => {
      console.error('Error modifying request:', error)
      return Promise.reject(error)
    },
  )

  // axios.defaults.headers.common["x-api-key"] = API_KEY;

  if (typeof window !== 'undefined') {
    // This block will only run on the client-side
    const accessCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('your-token='))

    const accessValue = accessCookie ? accessCookie.split('=')[1] : null

    if (accessValue) {
      axios.defaults.headers.common.Authorization = `Bearer ${accessValue}`
    }
  }

  // Global response interceptor for handling 401 errors
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 401) {
        // Handle unauthorized access here
        if (typeof window !== 'undefined') {
          window.location.href = '/login' // Redirect to login if unauthorized
        }
      }
      return Promise.reject(error)
    },
  )
}
