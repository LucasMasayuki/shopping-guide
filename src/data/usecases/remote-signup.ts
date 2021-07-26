import InvalidCredentialsError from '@/src/domain/errors/invalid-credentials-error'
import UnexpectedError from '@/src/domain/errors/unexpected-error'
import { Signup, SignupFields } from '@/src/domain/usecases/signup'
import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'
import SignupFieldsMapper from '../mapper/signup-fields-mapper'
import { HttpClient } from '../protocols/http/http-client'

type RemoteSignupReturn = {
  about: string
}

export default class RemoteSignup implements Signup {
  private readonly url: string

  private readonly httpClient: HttpClient<RemoteSignupReturn>

  constructor(url: string, httpClient: HttpClient<RemoteSignupReturn>) {
    this.url = url
    this.httpClient = httpClient
  }

  async register(fields: SignupFields): Promise<string> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: HttpMethods.POST,
      body: SignupFieldsMapper(fields),
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.OK: {
        if (httpResponse.body) {
          return httpResponse.body.about
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
