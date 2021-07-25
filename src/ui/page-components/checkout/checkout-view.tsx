import React from 'react'

import { Box } from '@chakra-ui/react'

import { useAuthState } from '../../contexts-providers/store/auth-provider'
import { SigninSignupStateProvider } from '../../contexts-providers/store/signin-signup-provider'
import AuthBox from './auth-box'
import { CartStateProvider } from '../../contexts-providers/store/cart-provider'
import ConfirmOrder from './confirm-order'

const CheckoutView = (): JSX.Element => {
  const { auth } = useAuthState()

  return (
    <>
      <Box
        backgroundColor="gray"
        h={auth.cpf === undefined ? '100vh' : 'inherit'}
        display="grid"
        alignItems="center"
        justifyItems="center"
        textAlign="center"
      >
        <Box />
        {auth.cpf === undefined ? (
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
