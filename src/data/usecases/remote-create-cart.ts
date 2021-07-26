import InvalidCredentialsError from '@/src/domain/errors/invalid-credentials-error'
import UnexpectedError from '@/src/domain/errors/unexpected-error'
import { Cart } from '@/src/domain/models/cart-model'
import { Product } from '@/src/domain/models/product-model'
import { CreateCart } from '@/src/domain/usecases/create-cart'
import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'
import CartMapper from '../mapper/cart-mapper'
import CartToApiMapper from '../mapper/cart-to-api-mapper'
import { HttpClient } from '../protocols/http/http-client'

export default class RemoteCreateCart implements CreateCart {
  private readonly url: string

  private readonly httpClient: HttpClient<Cart>

  constructor(url: string, httpClient: HttpClient<Cart>) {
    this.url = url
    this.httpClient = httpClient
  }

  async createCart(product: Product, aboutCart: string | null): Promise<Cart> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}`,
      method: HttpMethods.POST,
      body: CartToApiMapper(product, aboutCart),
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.OK: {
        if (httpResponse.body) {
          return CartMapper(httpResponse.body)
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
