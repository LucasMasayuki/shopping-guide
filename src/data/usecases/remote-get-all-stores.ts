import InvalidCredentialsError from '@/src/domain/errors/invalid-credentials-error'
import UnexpectedError from '@/src/domain/errors/unexpected-error'
import { GetAllStores, GetStoresResult, OrderBy } from '@/src/domain/usecases/get-all-stores'
import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'
import { HttpClient } from '../protocols/http/http-client'

export default class RemoteGetAllStores implements GetAllStores {
  private readonly url: string

  private readonly httpClient: HttpClient<GetStoresResult>

  constructor(url: string, httpClient: HttpClient<GetStoresResult>) {
    this.url = url
    this.httpClient = httpClient
  }

  async getAllStores(orderBy: OrderBy): Promise<GetStoresResult> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}?orderBy=${orderBy}`,
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
