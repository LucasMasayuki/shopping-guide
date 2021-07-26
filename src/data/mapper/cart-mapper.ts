/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Cart } from '@/src/domain/models/cart-model'
import ProductMapper from './product-mapper'

const CartMapper = (body: any): Cart => {
  return {
    about: body.aboutCarrinho,
    products: body.itensCarrinho.map((produtos: any) => {
      return ProductMapper(produtos)
    }),
    total: body.valorTotal,
  }
}
export default CartMapper
