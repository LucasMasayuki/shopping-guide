import InvalidCredentialsError from '@/src/domain/errors/invalid-credentials-error'
import UnexpectedError from '@/src/domain/errors/unexpected-error'
import { Product } from '@/src/domain/models/product-model'
import { GetProductsOfStore } from '@/src/domain/usecases/get-products-of-store'
import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'
import ProductListMapper from '../mapper/product-list-mapper'
import { HttpClient } from '../protocols/http/http-client'

export default class RemoteGetProductsOfStore implements GetProductsOfStore {
  private readonly url: string

  private readonly httpClient: HttpClient<Array<Product>>

  constructor(url: string, httpClient: HttpClient<Array<Product>>) {
    this.url = url
    this.httpClient = httpClient
  }

  async getProdcuts(aboutStore: string): Promise<Array<Product>> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}?aboutLoja=${encodeURIComponent(aboutStore)}`,
      method: HttpMethods.GET,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.OK: {
        if (httpResponse.body) {
          return ProductListMapper(httpResponse.body)
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
