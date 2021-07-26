/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { User } from '@/src/domain/models/user-model'
import React, { createContext, useContext, useState } from 'react'

type AuthStateContextType = {
  auth: string
  setAuth: (aboutUser: string) => void
}

const AuthStateContext = createContext<AuthStateContextType>({
  auth: '',
  setAuth: (aboutUser: string) => {},
})

const AuthStateProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [auth, setAuth] = useState('')
  return <AuthStateContext.Provider value={{ auth, setAuth }}>{children}</AuthStateContext.Provider>
}

const useAuthState = (): AuthStateContextType => {
  const context = useContext(AuthStateContext)
  if (!context) {
    throw new Error('useCartState must be used within a AuthStateContextType')
  }

  return context
}

export { AuthStateProvider, useAuthState }
