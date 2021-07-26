/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { cartToString } from '@/src/domain/models/cart-model'
import { PurchaseParam } from '@/src/domain/usecases/purchase'

type PurchaseApiParam = {
  aboutCarrinho: string
  formaPagamento: string
}

const LocationGuideMapper = (param: PurchaseParam): PurchaseApiParam => {
  return {
    aboutCarrinho: cartToString(param.cart),
    formaPagamento: param.takeoutPayment !== null ? param.takeoutPayment : '',
  }
}
export default LocationGuideMapper
