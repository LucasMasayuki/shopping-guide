import { Cart } from '../models/cart-model'
import { Product } from '../models/product-model'

export interface DecreaseProductQuantity {
  decreaseQuantity: (product: Product, aboutCart: string) => Promise<Cart>
}
