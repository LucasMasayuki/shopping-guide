import { Cart } from '../models/cart-model'

export type GetCartResult = Cart

export interface GetCart {
  getCart: (aboutCart: string) => Promise<Cart>
}
