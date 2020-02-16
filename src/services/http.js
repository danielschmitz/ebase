import axios from 'axios'
import store from '../store'
import router from '../router'
import { g } from '@/utils'
import auth from './auth'

const http = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  timeout: 1000000,
  headers: { 'Content-Type': 'application/json' }
})

http.interceptors.request.use(
  config => {
    const token = store.token
    if (token !== '') config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => Promise.reject(error)
)

http.interceptors.response.use(
  response => {
    const refreshToken = response.headers['refresh']
    if (refreshToken !== undefined)
      store.token = refreshToken
    return response
  },
  error => {
    if (g(error, 'response.status') === 401) {
      auth.logout()
      router.push('/login')
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

export default http
