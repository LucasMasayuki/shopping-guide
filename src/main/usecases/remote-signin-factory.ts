import RemoteSignin from '@/src/data/usecases/signin'
import { Signin } from '@/src/domain/usecases/signin'
import makeApiUrl from '../http/api-url-factory'
import makeAxiosHttpClient from '../http/axios-http-client-factory'

const makeRemoteSignin = (): Signin => new RemoteSignin(makeApiUrl('/signin'), makeAxiosHttpClient())

export default makeRemoteSignin
