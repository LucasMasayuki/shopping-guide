import { Cart } from '../models/cart-model'
import { Product } from '../models/product-model'

export type AddProductToCartResult = Cart
export interface AddProductToCart {
  addProductToCart: (product: Product, storeName?: string) => Promise<Cart>
}
