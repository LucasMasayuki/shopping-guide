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
    let cart: AddProductToCartResult = {
      products: [],
      total: 0,
    }

    if (json !== null) {
      cart = JSON.parse(json) as AddProductToCartResult
    }

    cart.products.push(product)
    this.storage.set('cart', JSON.stringify(cart))

    return cart
  }
}
