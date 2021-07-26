import RemoteProductAddToCart from '@/src/data/usecases/remote-add-product-to-cart'
import { AddProductToCart } from '@/src/domain/usecases/add-product-to-cart'
import { makeApiUrl } from '../http/api-url-factory'
import makeAxiosHttpClient from '../http/axios-http-client-factory'

const makeRemoteAddProductToCart = (): AddProductToCart =>
  new RemoteProductAddToCart(makeApiUrl('/adicionarProduto'), makeAxiosHttpClient())

export default makeRemoteAddProductToCart
