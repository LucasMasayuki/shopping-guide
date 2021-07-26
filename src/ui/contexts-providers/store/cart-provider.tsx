/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Cart } from '@/src/domain/models/cart-model'
import { Product } from '@/src/domain/models/product-model'
import React, { createContext, useContext, useState } from 'react'

type CartStateContextType = {
  cart: Cart
  setCart: (cart: Cart) => void
}

const products: Product[] = []
const initialState = {
  total: 0,
  about: '',
  products,
}

const CartStateContext = createContext<CartStateContextType>({
  cart: initialState,
  setCart: (cart: Cart) => {},
})

const CartStateProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [cart, setCart] = useState(initialState)
  return <CartStateContext.Provider value={{ cart, setCart }}>{children}</CartStateContext.Provider>
}

const useCartState = (): CartStateContextType => {
  const context = useContext(CartStateContext)
  if (!context) {
    throw new Error('useCartState must be used within a CartStateContext')
  }

  return context
}

export { CartStateProvider, useCartState }
