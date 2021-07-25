import InvalidCredentialsError from '@/src/domain/errors/invalid-credentials-error'
import UnexpectedError from '@/src/domain/errors/unexpected-error'
import { LocationGuide } from '@/src/domain/models/location-guide-model'
import { GetLocationGuide } from '@/src/domain/usecases/get-location-guide'
import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'
import LocationGuideMapper from '../mapper/location-guide-mapper'
import { HttpClient } from '../protocols/http/http-client'

export default class RemoteGetLocationGuide implements GetLocationGuide {
  private readonly url: string

  private readonly httpClient: HttpClient<LocationGuide>

  constructor(url: string, httpClient: HttpClient<LocationGuide>) {
    this.url = url
    this.httpClient = httpClient
  }

  async getLocationGuide(storeName: string): Promise<LocationGuide> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}?loja=${storeName}`,
      method: HttpMethods.GET,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.OK: {
        if (httpResponse.body) {
          return LocationGuideMapper(httpResponse.body)
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
