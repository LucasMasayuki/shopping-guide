import InvalidCredentialsError from '@/src/domain/errors/invalid-credentials-error'
import UnexpectedError from '@/src/domain/errors/unexpected-error'
import { Store } from '@/src/domain/models/store-model'
import { GetStore } from '@/src/domain/usecases/get-store'
import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'
import { HttpClient } from '../protocols/http/http-client'

export default class RemoteGetStore implements GetStore {
  private readonly url: string

  private readonly httpClient: HttpClient<Store>

  constructor(url: string, httpClient: HttpClient<Store>) {
    this.url = url
    this.httpClient = httpClient
  }

  async getStore(name: string): Promise<Store> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}?name=${name}`,
      method: HttpMethods.GET,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.OK: {
        if (httpResponse.body) {
          return httpResponse.body
        }

        throw new UnexpectedError()
      }

      case HttpStatusCode.UNAUTHORIZED:
        throw new InvalidCredentialsError()

      default:
        throw new UnexpectedError()
    }
  }
}
