import RemoteGetProductsOfStore from '@/src/data/usecases/remote-get-products-of-store'
import { GetProductsOfStore } from '@/src/domain/usecases/get-products-of-store'
import { makeApiUrl } from '../http/api-url-factory'
import makeAxiosHttpClient from '../http/axios-http-client-factory'

const makeRemoteGetProductsOfStore = (): GetProductsOfStore =>
  new RemoteGetProductsOfStore(makeApiUrl('/produtos'), makeAxiosHttpClient())

export default makeRemoteGetProductsOfStore
