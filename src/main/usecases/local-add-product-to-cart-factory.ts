import LocalAddProductToCart from '@/src/data/usecases/local-add-product-to-cart'
import { AddProductToCart } from '@/src/domain/usecases/add-product-to-cart'
import makeLocalStorage from '../cache/local-storage-factory'

const makeLocalAddProductToCart = (): AddProductToCart => new LocalAddProductToCart(makeLocalStorage())

export default makeLocalAddProductToCart
