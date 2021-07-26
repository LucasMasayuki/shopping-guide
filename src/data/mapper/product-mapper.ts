/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Product } from '@/src/domain/models/product-model'

const ProductMapper = (body: any): Product => {
  return {
    about: body.about,
    id: body.id,
    name: body.nome,
    description: body.descricao,
    price: body.preco,
    photo: body.pictureURI,
    category: body.categoria,
    inStock: 10,
    quantity: 0,
  }
}
export default ProductMapper
