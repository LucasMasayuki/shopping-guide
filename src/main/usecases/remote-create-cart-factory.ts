import RemoteCreateCart from '@/src/data/usecases/remote-create-cart'
import { CreateCart } from '@/src/domain/usecases/create-cart'
import { makeApiUrl } from '../http/api-url-factory'
import makeAxiosHttpClient from '../http/axios-http-client-factory'

const makeRemoteCreateCart = (): CreateCart => new RemoteCreateCart(makeApiUrl('/criarCarrinho'), makeAxiosHttpClient())

export default makeRemoteCreateCart
