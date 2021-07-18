import LocalGetCart from '@/src/data/usecases/local-get-cart'
import { GetCart } from '@/src/domain/usecases/get-cart'
import makeLocalStorage from '../cache/local-storage-factory'

const makeLocalGetCart = (): GetCart => new LocalGetCart(makeLocalStorage())

export default makeLocalGetCart
