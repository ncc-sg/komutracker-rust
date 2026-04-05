import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const defaultBaseUrl = 'http://localhost:5666'

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_KT_SERVER_URL
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl
  }
  return defaultBaseUrl
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: headers => {
      headers.set('Accept', 'application/json')
      return headers
    },
  }),
  endpoints: () => ({}),
})
