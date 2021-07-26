/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SignupFields } from '@/src/domain/usecases/signup'

type SignupFieldsToApi = {
  cpf: string
  dataNascimento: string
  email: string
  interesses: Array<string>
  nome: string
}

const SignupFieldsMapper = (fields: SignupFields): SignupFieldsToApi => {
  return {
    nome: fields.name,
    cpf: fields.document,
    dataNascimento: fields.birthdate,
    email: fields.email,
    interesses: [fields.interests],
  }
}
export default SignupFieldsMapper
