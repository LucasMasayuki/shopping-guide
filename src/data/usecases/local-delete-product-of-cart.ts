import { Product } from '@/src/domain/models/product-model'
import { DeleteProductOfCart, DeleteProductOfCartResult } from '@/src/domain/usecases/delete-product-of-cart'
import LocalStorage from '@/src/infra/cache/local-storage'

export default class LocalDeleteProductsOfCart implements DeleteProductOfCart {
  private readonly storage: LocalStorage

  constructor(storage: LocalStorage) {
    this.storage = storage
  }

  async deleteProductOfCart(
    product: Product,
    aboutCart: string,
    storeName?: string,
  ): Promise<DeleteProductOfCartResult> {
    const key = `cart-${storeName}`
    const json = this.storage.get(key)

    let cart: DeleteProductOfCartResult = {
      products: [],
      about: aboutCart,
      total: 0,
    }

    if (json === null) {
      return cart
    }

    cart = JSON.parse(json ?? '')

    let index = 0
    cart.products.forEach((currentProduct, currentIndex) => {
      if (currentProduct.id === product.id) {
        index = currentIndex
      }
    })

    cart.products.splice(index, 1)
    this.storage.set(key, JSON.stringify(cart))

    return cart
  }
}
