import { Product } from './product-model'

export type Cart = {
  about: string
  total: number
  products: Product[]
}

export const cartToString = (cart: Cart): string => {
  const string = ''
  cart.products.forEach((product) => {
    string.concat(
      `categoria: ${product.category}, `,
      `descrição: ${product.description}, `,
      `id: ${product.id}, `,
      `nome: ${product.name}, `,
      `preço: ${product.price}, `,
      `quantidade: ${product.quantity}, `,
    )
  })

  return `${string}, total: ${cart.total}`
}
