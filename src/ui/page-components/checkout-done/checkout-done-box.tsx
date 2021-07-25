import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import AppButton from '../shared/app-button'

const CheckoutDoneBox = (): JSX.Element => {
  const router = useRouter()

  return (
    <>
      <Box display="grid" h="100vh" alignItems="center" justifyItems="center" textAlign="center">
        <Box m="auto" p="10">
          <Heading as="h1" mb="20">
            Pedido concluido
          </Heading>
          <Text fontSize="xl" mb="4">
            Agora você só precisa se dirigir a loja escolhida e retirar seus produtos
          </Text>
          <Text fontSize="xl" mb="10">
            Muito obrigado pela preferẽncia
          </Text>
          <AppButton _hover={{ bgColor: 'secondaryColor' }} onClick={() => router.push('/')}>
            Retornar para o menu principal
          </AppButton>
        </Box>
      </Box>
    </>
  )
}

export default CheckoutDoneBox
