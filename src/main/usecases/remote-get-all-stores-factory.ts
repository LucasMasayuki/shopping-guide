import { GetAllStores } from '@/src/domain/usecases/get-all-stores'
import RemoteGetAllStores from '@/src/data/usecases/remote-get-all-stores'
import { makeApiUrl } from '../http/api-url-factory'
import makeAxiosHttpClient from '../http/axios-http-client-factory'

const makeRemoteGetAllStores = (): GetAllStores => new RemoteGetAllStores(makeApiUrl('/lojas'), makeAxiosHttpClient())

export default makeRemoteGetAllStores
