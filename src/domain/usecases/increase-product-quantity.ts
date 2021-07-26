import { Cart } from '../models/cart-model'
import { Product } from '../models/product-model'

export interface IncreaseProductQuantity {
  increaseQuantity: (product: Product, aboutCart: string) => Promise<Cart>
}
