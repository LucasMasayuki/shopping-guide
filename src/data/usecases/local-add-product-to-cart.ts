import { Product } from '@/src/domain/models/product-model'
import { AddProductToCart, AddProductToCartResult } from '@/src/domain/usecases/add-product-to-cart'
import LocalStorage from '@/src/infra/cache/local-storage'

export default class LocalAddProductTocart implements AddProductToCart {
  private readonly storage: LocalStorage

  constructor(storage: LocalStorage) {
    this.storage = storage
  }

  async addProductToCart(product: Product): Promise<AddProductToCartResult> {
    const json = this.storage.get('cart')
    let currentCart: AddProductToCartResult = JSON.parse(json ?? '')

    if (!currentCart) {
      currentCart = {
        products: [],
        total: 0,
      }
    }

    currentCart.products.push(product)
    this.storage.set('cart', JSON.stringify(currentCart))

    return currentCart
  }
}
