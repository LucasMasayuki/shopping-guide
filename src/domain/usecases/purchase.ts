import { Cart } from '../models/cart-model'
import { Creditcard } from '../models/creditcard-model'

export type PurchaseParam = {
  cart: Cart
  creditcard: Creditcard | null
  takeoutPayment: string | null
}

export interface Purchase {
  purchase: (param: PurchaseParam) => Promise<void>
}
