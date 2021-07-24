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

export const isValidCpf = (value: string): boolean => {
  const cpf = value.replace(/[.-]/g, '')
  const sameDigitsPattern = /^(.)\1*$/ // Regex for diferent digits

  if (sameDigitsPattern.test(cpf)) {
    return false
  }

  let add = 0
  let rev

  for (let i = 0; i < 9; i += 1) {
    add += parseInt(cpf.charAt(i), 10) * (10 - i)
    rev = 11 - (add % 11)
  }

  if (rev === 10 || rev === 11) {
    rev = 0
  }

  if (rev !== parseInt(cpf.charAt(9), 10)) {
    return false
  }

  add = 0

  for (let i = 0; i < 10; i += 1) {
    add += parseInt(cpf.charAt(i), 10) * (11 - i)
  }

  rev = 11 - (add % 11)

  if (rev === 10 || rev === 11) {
    rev = 0
  }

  if (rev !== parseInt(cpf.charAt(10), 10)) {
    return false
  }

  return true
}
