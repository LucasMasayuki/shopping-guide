import RemoteSignup from '@/src/data/usecases/remote-signup'
import { Signup } from '@/src/domain/usecases/signup'
import { makeApiUrl } from '../http/api-url-factory'
import makeAxiosHttpClient from '../http/axios-http-client-factory'

const makeRemoteSignup = (): Signup => new RemoteSignup(makeApiUrl('/clientes'), makeAxiosHttpClient())

export default makeRemoteSignup
