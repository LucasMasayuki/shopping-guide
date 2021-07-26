import { Cart } from '../models/cart-model'
import { Product } from '../models/product-model'

export type DeleteProductOfCartResult = Cart

export interface DeleteProductOfCart {
  deleteProductOfCart: (product: Product, aboutCart: string, storeName?: string) => Promise<Cart>
}
