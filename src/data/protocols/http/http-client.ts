/* eslint-disable @typescript-eslint/no-explicit-any */

import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'

export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpMethod = HttpMethods.POST | HttpMethods.GET | HttpMethods.PUT | HttpMethods.DELETE

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}
