import RemoteDeleteProductOfCart from '@/src/data/usecases/remote-delete-product-of-cart'
import { DeleteProductOfCart } from '@/src/domain/usecases/delete-product-of-cart'
import makeApiUrl from '../http/api-url-factory'
import makeAxiosHttpClient from '../http/axios-http-client-factory'

const makeRemoteDeleteProductOfCart = (): DeleteProductOfCart =>
  new RemoteDeleteProductOfCart(makeApiUrl('/cart'), makeAxiosHttpClient())

export default makeRemoteDeleteProductOfCart
