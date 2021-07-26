import InvalidCredentialsError from '@/src/domain/errors/invalid-credentials-error'
import UnexpectedError from '@/src/domain/errors/unexpected-error'
import { Purchase, PurchaseParam } from '@/src/domain/usecases/purchase'
import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'
import PurchaseToApiMapper from '../mapper/purchase-to-api'
import { HttpClient } from '../protocols/http/http-client'

export default class RemotePurchase implements Purchase {
  private readonly url: string

  private readonly httpClient: HttpClient<void>

  constructor(url: string, httpClient: HttpClient<void>) {
    this.url = url
    this.httpClient = httpClient
  }

  async purchase(param: PurchaseParam): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: HttpMethods.POST,
      body: PurchaseToApiMapper(param),
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.OK: {
        return
      }

      case HttpStatusCode.UNAUTHORIZED:
        throw new InvalidCredentialsError()

      default:
        throw new UnexpectedError()
    }
  }
}
