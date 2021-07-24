import { User } from '../models/user-model'

export type SignupFields = {
  email: string
  name: string
  birthdate: string
  interests: string
  document: string
}

export interface Signup {
  register: (fields: SignupFields) => Promise<User>
}
