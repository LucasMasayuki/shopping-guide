import { Cart } from '../models/cart-model'

export type DeleteProductOfCartResult = Cart

export interface DeleteProductOfCart {
  deleteProductOfCart: (id: number) => Promise<Cart>
}
