import RemoteGetCart from '@/src/data/usecases/remote-get-cart'
import { GetCart } from '@/src/domain/usecases/get-cart'
import { makeApiUrl } from '../http/api-url-factory'
import makeAxiosHttpClient from '../http/axios-http-client-factory'

const makeRemoteGetCart = (): GetCart => new RemoteGetCart(makeApiUrl('/carrinho'), makeAxiosHttpClient())

export default makeRemoteGetCart
