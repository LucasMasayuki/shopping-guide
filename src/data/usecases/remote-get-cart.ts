import InvalidCredentialsError from '@/src/domain/errors/invalid-credentials-error'
import UnexpectedError from '@/src/domain/errors/unexpected-error'
import { GetCart, GetCartResult } from '@/src/domain/usecases/get-cart'
import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'
import CartMapper from '../mapper/cart-mapper'
import { HttpClient } from '../protocols/http/http-client'

export default class RemoteGetCart implements GetCart {
  private readonly url: string

  private readonly httpClient: HttpClient<GetCartResult>

  constructor(url: string, httpClient: HttpClient<GetCartResult>) {
    this.url = url
    this.httpClient = httpClient
  }

  async getCart(aboutCart: string): Promise<GetCartResult> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}?about=${encodeURIComponent(aboutCart)}`,
      method: HttpMethods.GET,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.OK: {
        if (httpResponse.body) {
          return CartMapper(httpResponse.body)
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
