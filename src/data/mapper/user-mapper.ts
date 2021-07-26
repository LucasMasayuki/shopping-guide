/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { User } from '@/src/domain/models/user-model'

const UserMapper = (body: Array<any>): User => {
  return {
    about: body[0].about,
    name: body[0].nome,
    cpf: body[0].cpf,
    birthdate: '',
    email: body[0].email,
    interest: body[0].interesse,
  }
}
export default UserMapper
