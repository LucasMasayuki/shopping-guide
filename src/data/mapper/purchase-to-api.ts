import { PurchaseParam } from '@/src/domain/usecases/purchase'

type PurchaseToApi = {
  aboutCarrinho: string
  aboutCliente: string
  formaPagamento: string | null
}

const PurchaseToApiMapper = (purchaseParams: PurchaseParam): PurchaseToApi => {
  return {
    aboutCarrinho: encodeURIComponent(purchaseParams.cart.about),
    aboutCliente: encodeURIComponent(purchaseParams.aboutUser),
    formaPagamento: purchaseParams.takeoutPayment,
  }
}
export default PurchaseToApiMapper
