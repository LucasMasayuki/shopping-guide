import RemoteSignin from '@/src/data/usecases/remote-signin'
import { Signin } from '@/src/domain/usecases/signin'
import { makeApiUrl } from '../http/api-url-factory'
import makeAxiosHttpClient from '../http/axios-http-client-factory'

const makeRemoteSignin = (): Signin => new RemoteSignin(makeApiUrl('/clientes'), makeAxiosHttpClient())

export default makeRemoteSignin
