import { Cart } from '@/src/domain/models/cart-model'
import { Icon } from '@chakra-ui/icons'
import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

type Props = {
  cart: Cart
}

const CartIcon = ({ cart }: Props): JSX.Element => {
  return (
    <Box position="relative" width="min-content" float="right">
      <Icon as={FaShoppingCart} fontSize="3xl" />
      <Box
        position="absolute"
        background="red"
        borderRadius="30"
        width="15px"
        height="15px"
        bottom="0"
        right="0"
        display="grid"
        alignItems="center"
        justifyItems="center"
      >
        <Text fontSize="10px" color="black" fontWeight="bold" zIndex="1000">
          {cart.products.length}
        </Text>
      </Box>
    </Box>
  )
}

export default CartIcon
