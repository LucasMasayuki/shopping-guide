import { DeleteProductOfCart, DeleteProductOfCartResult } from '@/src/domain/usecases/delete-product-of-cart'
import LocalStorage from '@/src/infra/cache/local-storage'

export default class LocalDeleteProductsOfCart implements DeleteProductOfCart {
  private readonly storage: LocalStorage

  constructor(storage: LocalStorage) {
    this.storage = storage
  }

  async deleteProductOfCart(id: number, storeName?: string): Promise<DeleteProductOfCartResult> {
    const key = `cart-${storeName}`
    const json = this.storage.get(key)

    let cart: DeleteProductOfCartResult = {
      products: [],
      about: '',
      total: 0,
    }

    if (json === null) {
      return cart
    }

    cart = JSON.parse(json ?? '')

    let index = 0
    cart.products.forEach((product, currentIndex) => {
      if (id === product.id) {
        index = currentIndex
      }
    })

    cart.products.splice(index, 1)
    this.storage.set(key, JSON.stringify(cart))

    return cart
  }
}
