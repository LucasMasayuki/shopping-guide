import { User } from '../models/user-model'

export interface Signin {
  login: (email: string) => Promise<User>
}
