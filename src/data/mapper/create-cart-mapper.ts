import { CreateCartParams } from '@/src/domain/usecases/create-cart'

type CreateCartToApi = {
  aboutCarrinho: string | null
  aboutProduto: string
  quantidadeProduto: number
}

const CreateCartMapper = (param: CreateCartParams): CreateCartToApi => {
  return {
    aboutCarrinho: param.aboutCart,
    aboutProduto: param.aboutProduct,
    quantidadeProduto: param.productQuantity,
  }
}
export default CreateCartMapper
