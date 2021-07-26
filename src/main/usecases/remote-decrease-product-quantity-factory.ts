import RemoteDecreaseProductQuantity from '@/src/data/usecases/remote-decrease-product-quantity'
import { DecreaseProductQuantity } from '@/src/domain/usecases/decrease-product-quantity'
import { makeApiUrl } from '../http/api-url-factory'
import makeAxiosHttpClient from '../http/axios-http-client-factory'

const makeDecreaseProductQuantity = (): DecreaseProductQuantity =>
  new RemoteDecreaseProductQuantity(makeApiUrl('/decrementar'), makeAxiosHttpClient())

export default makeDecreaseProductQuantity
