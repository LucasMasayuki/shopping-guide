import { Product } from './product-model'

export type Store = {
  about: string

  name: string

  activity: string

  photo: string | null

  description: string | null

  site: string

  phone: string

  products: Array<Product>
}
