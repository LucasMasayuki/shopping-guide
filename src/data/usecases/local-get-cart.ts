import { GetCart, GetCartResult } from '@/src/domain/usecases/get-cart'
import LocalStorage from '@/src/infra/cache/local-storage'

export default class LocalGetCart implements GetCart {
  private readonly storage: LocalStorage

  constructor(storage: LocalStorage) {
    this.storage = storage
  }

  async getCart(storeName?: string): Promise<GetCartResult> {
    const key = `cart-${storeName}`
    const json = this.storage.get(key)
    let cart: GetCartResult = {
      products: [],
      total: 0,
      about: '',
    }

    if (json !== null) {
      cart = JSON.parse(json) as GetCartResult
    }

    return cart
  }
}
