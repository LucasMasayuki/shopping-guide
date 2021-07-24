import React from 'react'

import { Box } from '@chakra-ui/react'
import { useSigninSignupState } from '../../contexts-providers/store/signin-signup-provider'
import Signin from './signin'
import Signup from './signup'

const AuthBox = (): JSX.Element => {
  const { isSigninScreen } = useSigninSignupState()

  return (
    <>
      <Box backgroundColor="white" borderRadius="10" padding="10">
        {isSigninScreen ? <Signin /> : <Signup />}
      </Box>
    </>
  )
}

export default AuthBox
