import React from 'react'

import { Box } from '@chakra-ui/react'

import { useAuthState } from '../../contexts-providers/store/auth-provider'
import { SigninSignupStateProvider } from '../../contexts-providers/store/signin-signup-provider'
import AuthBox from './auth-box'

const CheckoutView = (): JSX.Element => {
  const { auth } = useAuthState()

  return (
    <>
      <Box backgroundColor="gray" h="600px" display="grid" alignItems="center" justifyItems="center" textAlign="center">
        <Box />
        {auth ? (
          <SigninSignupStateProvider>
            <AuthBox />
          </SigninSignupStateProvider>
        ) : (
          <Box />
        )}
      </Box>
    </>
  )
}

export default CheckoutView
