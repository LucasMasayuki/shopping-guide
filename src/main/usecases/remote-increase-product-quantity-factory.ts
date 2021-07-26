import RemoteIncreaseProductQuantity from '@/src/data/usecases/remote-increase-product-quantity'
import { IncreaseProductQuantity } from '@/src/domain/usecases/increase-product-quantity'
import { makeApiUrl } from '../http/api-url-factory'
import makeAxiosHttpClient from '../http/axios-http-client-factory'

const makeIncreaseProductQuantity = (): IncreaseProductQuantity =>
  new RemoteIncreaseProductQuantity(makeApiUrl('/incrementar'), makeAxiosHttpClient())

export default makeIncreaseProductQuantity
