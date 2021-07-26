import { Product } from '../models/product-model'

export interface GetProductsByInterests {
  getProductsByInterest: (interests: Array<string>) => Promise<Array<Product>>
}
