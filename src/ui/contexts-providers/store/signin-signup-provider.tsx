/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useState } from 'react'

type SigninSignupStateContextType = {
  isSigninScreen: boolean
  setIsSigninScreen: (isSigninScreen: boolean) => void
}

const SigninSignupStateContext = createContext<SigninSignupStateContextType>({
  isSigninScreen: true,
  setIsSigninScreen: (isSigninScreen: boolean) => {},
})

const SigninSignupStateProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [isSigninScreen, setIsSigninScreen] = useState(true)
  return (
    <SigninSignupStateContext.Provider value={{ isSigninScreen, setIsSigninScreen }}>
      {children}
    </SigninSignupStateContext.Provider>
  )
}

const useSigninSignupState = (): SigninSignupStateContextType => {
  const context = useContext(SigninSignupStateContext)
  if (!context) {
    throw new Error('useCartState must be used within a SigninSignupStateContext')
  }

  return context
}

export { SigninSignupStateProvider, useSigninSignupState }
