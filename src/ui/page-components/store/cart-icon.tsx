import { Icon } from '@chakra-ui/icons'
import { Box, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { useCartState } from '../../contexts-providers/store/cart-provider'
import CartDrawer from './cart-drawer'

const CartIcon = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { cart } = useCartState()

  return (
    <Box position="relative" width="min-content" float="right" onClick={onOpen}>
      <CartDrawer isOpen={isOpen} onClose={onClose} />
      <Icon as={FaShoppingCart} fontSize="3xl" />
      <Box
        position="absolute"
        background="secondaryColor"
        borderRadius="30"
        width="15px"
        height="15px"
        bottom="0"
        right="0"
        display="grid"
        alignItems="center"
        justifyItems="center"
      >
        <Text fontSize="10px" color="white" fontWeight="bold" zIndex="1000">
          {cart.products.length}
        </Text>
      </Box>
    </Box>
  )
}

export default CartIcon
