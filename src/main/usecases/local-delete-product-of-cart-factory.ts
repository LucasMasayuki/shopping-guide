import LocalDeleteProductsOfCart from '@/src/data/usecases/local-delete-product-of-cart'
import { DeleteProductOfCart } from '@/src/domain/usecases/delete-product-of-cart'
import makeLocalStorage from '../cache/local-storage-factory'

const makeLocalDeleteProductOfCart = (): DeleteProductOfCart => new LocalDeleteProductsOfCart(makeLocalStorage())

export default makeLocalDeleteProductOfCart
