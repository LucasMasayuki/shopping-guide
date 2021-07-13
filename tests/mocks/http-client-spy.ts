import { HttpClient, HttpRequest, HttpResponse } from '@/src/data/protocols/http/http-client'
import HttpStatusCode from '@/src/utils/http-status-code'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string

  method?: string

  body?: any

  headers?: any

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.OK,
  }

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers
    return this.response
  }
}
