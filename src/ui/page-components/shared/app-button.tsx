import React from 'react'

import { Button } from '@chakra-ui/react'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AppButton = ({ children, ...rest }: any): JSX.Element => {
  return (
    <Button borderRadius="30" bgColor="secondaryColor" color="white" justifySelf="end" {...rest}>
      {children}
    </Button>
  )
}

export default AppButton
