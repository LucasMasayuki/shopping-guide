import { HttpClient, HttpRequest, HttpResponse } from '@/src/data/protocols/http/http-client'
import axios, { AxiosResponse } from 'axios'

export default class AxiosHttpClient implements HttpClient {
  // eslint-disable-next-line class-methods-use-this
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    console.log(data)

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      })
    } catch (error) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }
}
