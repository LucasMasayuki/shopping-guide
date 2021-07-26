import React, { useEffect } from 'react'

import { Box } from '@chakra-ui/react'

import { User } from '@/src/domain/models/user-model'
import { useAuthState } from '../../contexts-providers/store/auth-provider'
import { SigninSignupStateProvider } from '../../contexts-providers/store/signin-signup-provider'
import AuthBox from './auth-box'
import { CartStateProvider } from '../../contexts-providers/store/cart-provider'
import ConfirmOrder from './confirm-order'

const CheckoutView = (): JSX.Element => {
  const { auth, setAuth } = useAuthState()

  useEffect(() => {
    const user = localStorage.getItem('auth')
    if (user !== null) {
      const parsed = JSON.parse(user) as User

      setAuth(parsed.about ?? '')
    }
  }, [setAuth])

  console.log('Usuario logado')
  console.log(auth)

  return (
    <>
      <Box
        backgroundColor="gray"
        h={auth === '' ? '100vh' : 'inherit'}
        display="grid"
        alignItems="center"
        justifyItems="center"
        textAlign="center"
      >
        <Box />
        {auth === '' ? (
          <SigninSignupStateProvider>
            <AuthBox />
          </SigninSignupStateProvider>
        ) : (
          <CartStateProvider>
            <ConfirmOrder />
          </CartStateProvider>
        )}
      </Box>
    </>
  )
}

export default CheckoutView
