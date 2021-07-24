import RemotePurchase from '@/src/data/usecases/remote-purchase'
import { Purchase } from '@/src/domain/usecases/purchase'
import makeApiUrl from '../http/api-url-factory'
import makeAxiosHttpClient from '../http/axios-http-client-factory'

const makeRemotePurchase = (): Purchase => new RemotePurchase(makeApiUrl('/purchase'), makeAxiosHttpClient())

export default makeRemotePurchase
