import { Cart } from '../models/cart-model'
import { Product } from '../models/product-model'

export interface CreateCart {
  createCart: (product: Product, aboutCart: string | null) => Promise<Cart>
}
