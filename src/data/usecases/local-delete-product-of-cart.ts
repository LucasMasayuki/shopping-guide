import { DeleteProductOfCart, DeleteProductOfCartResult } from '@/src/domain/usecases/delete-product-of-cart'
import LocalStorage from '@/src/infra/cache/local-storage'

export default class LocalDeleteProductsOfCart implements DeleteProductOfCart {
  private readonly storage: LocalStorage

  constructor(storage: LocalStorage) {
    this.storage = storage
  }

  async deleteProductOfCart(id: number): Promise<DeleteProductOfCartResult> {
    const json = this.storage.get('cart')
    let currentCart: DeleteProductOfCartResult = JSON.parse(json ?? '')

    if (!currentCart) {
      currentCart = {
        products: [],
        total: 0,
      }

      return currentCart
    }

    let index = 0
    currentCart.products.forEach((product, currentIndex) => {
      if (id === product.id) {
        index = currentIndex
      }
    })

    currentCart.products.splice(index, 1)
    this.storage.set('cart', JSON.stringify(currentCart))

    return currentCart
  }
}
