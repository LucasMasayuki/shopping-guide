import { GetCart, GetCartResult } from '@/src/domain/usecases/get-cart'
import LocalStorage from '@/src/infra/cache/local-storage'

export default class LocalGetCart implements GetCart {
  private readonly storage: LocalStorage

  constructor(storage: LocalStorage) {
    this.storage = storage
  }

  async getCart(): Promise<GetCartResult> {
    const json = this.storage.get('cart')
    let cart: GetCartResult = {
      products: [],
      total: 0,
    }

    if (json !== null) {
      cart = JSON.parse(json) as GetCartResult
    }

    return cart
  }
}
