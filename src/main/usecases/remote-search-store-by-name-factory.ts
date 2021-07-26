import RemoteSearchStoreByName from '@/src/data/usecases/remote-search-store-by-name'
import { SearchStoreByName } from '@/src/domain/usecases/search-store-by-name'
import { makeApiUrl } from '../http/api-url-factory'
import makeAxiosHttpClient from '../http/axios-http-client-factory'

const makeRemoteSearchStoreByName = (): SearchStoreByName =>
  new RemoteSearchStoreByName(makeApiUrl('/lojas'), makeAxiosHttpClient())

export default makeRemoteSearchStoreByName
