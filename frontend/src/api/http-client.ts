import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import ResponseEnvelope from '@/api/types/ResponseEnvelope'
import { envConstants } from '@/constants/env.constants'

type httpMethod = 'get' | 'post' | 'put' | 'delete'
interface HttpClientRequestConfig {
  body?: Record<string, any>
  method: httpMethod
  params?: Record<string, any>
  url: string
}

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: envConstants.apiUrlBase
})

export const httpClient = {
  executeRequest: async <T>(
    config: HttpClientRequestConfig
  ): Promise<ResponseEnvelope<T>> => {
    const requestObject: AxiosRequestConfig = {
      method: config.method,
      url: config.url
    }
    if (config.body) {
      requestObject.data = config.body
    }
    if (config.params) {
      requestObject.params = config.params
    }
    const response = await axiosInstance.request<ResponseEnvelope<T>>(
      requestObject
    )
    return response.data
  }
}
