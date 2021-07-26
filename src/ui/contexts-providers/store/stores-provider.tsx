/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Store } from '@/src/domain/models/store-model'
import React, { createContext, useContext, useState } from 'react'

const defaultStores: Store[] = []
type StoresStateContextType = {
  stores: Store[]
  setStores: (stores: Store[]) => void
}

const StoresStateContext = createContext<StoresStateContextType>({
  stores: defaultStores,
  setStores: (stores: Store[]) => {},
})

const StoresStateProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [stores, setStores] = useState(defaultStores)
  return <StoresStateContext.Provider value={{ stores, setStores }}>{children}</StoresStateContext.Provider>
}

const useStoresState = (): StoresStateContextType => {
  const context = useContext(StoresStateContext)
  if (!context) {
    throw new Error('useStoresState must be used within a StoresStateContext')
  }

  return context
}

export { StoresStateProvider, useStoresState }
