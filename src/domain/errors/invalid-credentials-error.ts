import HttpStatusCode from '@/src/utils/http-status-code'

export default class InvalidCredentialsError extends Error {
  code: HttpStatusCode

  constructor() {
    super('Credenciais inválidas')
    this.name = 'InvalidCredentialsError'
    this.code = HttpStatusCode.UNAUTHORIZED
  }
}
