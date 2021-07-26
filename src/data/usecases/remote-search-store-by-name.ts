import InvalidCredentialsError from '@/src/domain/errors/invalid-credentials-error'
import UnexpectedError from '@/src/domain/errors/unexpected-error'
import { Store } from '@/src/domain/models/store-model'
import { SearchStoreByName } from '@/src/domain/usecases/search-store-by-name'
import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'
import StoreListMapper from '../mapper/store-list-mapper'
import { HttpClient } from '../protocols/http/http-client'

export default class RemoteSearchStoreByName implements SearchStoreByName {
  private readonly url: string

  private readonly httpClient: HttpClient<Store[]>

  constructor(url: string, httpClient: HttpClient<Store[]>) {
    this.url = url
    this.httpClient = httpClient
  }

  async search(storeName: string): Promise<Store[]> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}?nome=${storeName}`,
      method: HttpMethods.GET,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.OK: {
        if (httpResponse.body) {
          return StoreListMapper(httpResponse.body)
        }

        throw new UnexpectedError(httpResponse.statusCode)
      }

      case HttpStatusCode.UNAUTHORIZED:
        throw new InvalidCredentialsError()

      default:
        throw new UnexpectedError()
    }
  }
}
