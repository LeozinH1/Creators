import axios from 'axios'
import { parseCookies } from 'nookies'

export function getAPIClient(ctx?: any) {
  const { 'creators-token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.BASE_API,
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }

  return api
}
