import { Product } from '@/src/domain/models/product-model'
import { AddProductToCart, AddProductToCartResult } from '@/src/domain/usecases/add-product-to-cart'
import LocalStorage from '@/src/infra/cache/local-storage'
import { getCartTotal } from '@/src/utils/utiltiies-functions'

export default class LocalAddProductToCart implements AddProductToCart {
  private readonly storage: LocalStorage

  constructor(storage: LocalStorage) {
    this.storage = storage
  }

  async addProductToCart(product: Product, aboutCart: string, storeName?: string): Promise<AddProductToCartResult> {
    const key = `cart-${storeName}`
    const json = this.storage.get(key)
    let cart: AddProductToCartResult = {
      products: [],
      about: aboutCart,
      total: 0,
    }

    if (json !== null) {
      cart = JSON.parse(json) as AddProductToCartResult
    }

    let alreadyHasProductInCart = false

    cart.products = cart.products.map((productInCart) => {
      if (productInCart.id === product.id) {
        // eslint-disable-next-line no-param-reassign
        productInCart.quantity += product.quantity
        alreadyHasProductInCart = true
      }

      return productInCart
    })

    if (!alreadyHasProductInCart) {
      cart.products.push(product)
    }

    const total = getCartTotal(cart)
    cart.total = total

    this.storage.set(key, JSON.stringify(cart))

    return cart
  }
}
