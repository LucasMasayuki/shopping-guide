/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { User } from '@/src/domain/models/user-model'

const UserMapper = (body: any): User => {
  return {
    name: body.nome,
    cpf: body.cpf,
    birthdate: '',
    email: body.email,
    interest: body.interesse,
  }
}
export default UserMapper
