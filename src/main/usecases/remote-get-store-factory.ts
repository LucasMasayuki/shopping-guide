import RemoteGetStore from '@/src/data/usecases/remote-get-store'
import { GetStore } from '@/src/domain/usecases/get-store'
import { makeApiUrl } from '../http/api-url-factory'
import makeAxiosHttpClient from '../http/axios-http-client-factory'

const makeRemoteGetStore = (): GetStore => new RemoteGetStore(makeApiUrl('/store'), makeAxiosHttpClient())

export default makeRemoteGetStore
