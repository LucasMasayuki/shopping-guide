import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const EmptyCartView = (): JSX.Element => {
  return (
    <Box textAlign="center">
      <Text>Nenhum produto adicionado</Text>
    </Box>
  )
}

export default EmptyCartView
