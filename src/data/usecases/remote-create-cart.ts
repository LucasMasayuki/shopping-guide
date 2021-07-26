import InvalidCredentialsError from '@/src/domain/errors/invalid-credentials-error'
import UnexpectedError from '@/src/domain/errors/unexpected-error'
import { Cart } from '@/src/domain/models/cart-model'
import { CreateCart, CreateCartParams } from '@/src/domain/usecases/create-cart'
import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'
import CartMapper from '../mapper/cart-mapper'
import CreateCartMapper from '../mapper/create-cart-mapper'
import { HttpClient } from '../protocols/http/http-client'

export default class RemoteCreateCart implements CreateCart {
  private readonly url: string

  private readonly httpClient: HttpClient<Cart>

  constructor(url: string, httpClient: HttpClient<Cart>) {
    this.url = url
    this.httpClient = httpClient
  }

  async createCart(params: CreateCartParams): Promise<Cart> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}`,
      method: HttpMethods.POST,
      body: CreateCartMapper(params),
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
