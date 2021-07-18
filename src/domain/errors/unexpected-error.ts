import HttpStatusCode from '@/src/utils/http-status-code'

export default class UnexpectedError extends Error {
  code: HttpStatusCode

  constructor(errorCode = HttpStatusCode.BAD_REQUEST) {
    super('Algo de errado aconteceu. Tente novamente em breve.')
    this.name = 'UnexpectedError'
    this.code = errorCode
  }
}
