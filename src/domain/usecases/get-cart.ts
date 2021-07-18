import { Cart } from '../models/cart-model'

export type GetCartResult = Cart

export interface GetCart {
  getCart: () => Promise<Cart>
}
