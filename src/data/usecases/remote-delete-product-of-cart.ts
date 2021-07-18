import InvalidCredentialsError from '@/src/domain/errors/invalid-credentials-error'
import UnexpectedError from '@/src/domain/errors/unexpected-error'
import { Cart } from '@/src/domain/models/cart-model'
import { DeleteProductOfCart } from '@/src/domain/usecases/delete-product-of-cart'
import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'
import { HttpClient } from '../protocols/http/http-client'

export default class RemoteDeleteProductOfCart implements DeleteProductOfCart {
  private readonly url: string

  private readonly httpClient: HttpClient<Cart>

  constructor(url: string, httpClient: HttpClient<Cart>) {
    this.url = url
    this.httpClient = httpClient
  }

  async deleteProductOfCart(id: number): Promise<Cart> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}`,
      method: HttpMethods.DELETE,
      body: { id },
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.OK: {
        if (httpResponse.body) {
          return httpResponse.body
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
