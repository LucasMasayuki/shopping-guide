import { Cart } from '../domain/models/cart-model'

export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K): Record<K, T[]> =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem)
    // eslint-disable-next-line no-param-reassign
    if (!previous[group]) previous[group] = []
    previous[group].push(currentItem)
    return previous
  }, {} as Record<K, T[]>)

export const currency = (value: number): string => {
  const intl = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return intl.format(value)
}

export const getCartTotal = (cart: Cart): number => {
  let total = 0

  cart.products.forEach((product) => {
    total += product.quantity * product.price
  })

  return total
}
