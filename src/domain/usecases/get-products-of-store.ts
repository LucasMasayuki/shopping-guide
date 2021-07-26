import { Product } from '../models/product-model'

export interface GetProductsOfStore {
  getProdcuts: (about: string) => Promise<Array<Product>>
}
