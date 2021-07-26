import { Cart } from '../models/cart-model'

export type CreateCartParams = {
  aboutCart: string | null
  aboutProduct: string
  productQuantity: number
}

export interface CreateCart {
  createCart: (params: CreateCartParams) => Promise<Cart>
}
