/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Product } from '@/src/domain/models/product-model'
import ProductMapper from './product-mapper'

const ProductListMapper = (body: Array<any>): Array<Product> => {
  return body.map((bodyValue) => {
    return ProductMapper(bodyValue)
  })
}
export default ProductListMapper
