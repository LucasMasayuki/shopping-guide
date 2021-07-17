import RemoteGetStore from '@/src/data/usecases/remote-get-store'
import { GetStore } from '@/src/domain/usecases/get-store'
import makeApiUrl from '../http/api-url-factory'
import makeAxiosHttpClient from '../http/axios-http-client-factory'

const makeRemoteGetAllStores = (): GetStore => new RemoteGetStore(makeApiUrl('/get-store'), makeAxiosHttpClient())

export default makeRemoteGetAllStores
