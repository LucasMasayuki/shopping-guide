import InvalidCredentialsError from '@/src/domain/errors/invalid-credentials-error'
import UnexpectedError from '@/src/domain/errors/unexpected-error'
import { User } from '@/src/domain/models/user-model'
import { Signup, SignupFields } from '@/src/domain/usecases/signup'
import HttpMethods from '@/src/utils/http-methods'
import HttpStatusCode from '@/src/utils/http-status-code'
import { HttpClient } from '../protocols/http/http-client'

export default class RemoteSignup implements Signup {
  private readonly url: string

  private readonly httpClient: HttpClient<User>

  constructor(url: string, httpClient: HttpClient<User>) {
    this.url = url
    this.httpClient = httpClient
  }

  async register(fields: SignupFields): Promise<User> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: HttpMethods.POST,
      body: fields,
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
