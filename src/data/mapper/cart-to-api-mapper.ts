import { Product } from '@/src/domain/models/product-model'

type CartToApi = {
  aboutCarrinho: string | null
  aboutProduto: string
  quantidadeProduto: number
}

const CartToApiMapper = (product: Product, aboutCart: string | null): CartToApi => {
  return {
    aboutCarrinho: aboutCart,
    aboutProduto: product.about,
    quantidadeProduto: product.quantity,
  }
}
export default CartToApiMapper
