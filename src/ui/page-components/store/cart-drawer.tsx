import { currency } from '@/src/utils/utiltiies-functions'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useCartState } from '../../contexts-providers/store/cart-provider'
import AppButton from '../shared/app-button'
import ProductInput from '../shared/product-input'
import EmptyCartView from './empty-cart-view'

type Props = {
  onClose: () => void
  isOpen: boolean
  storeName: string
}

const CartDrawer = ({ onClose, isOpen, storeName }: Props): JSX.Element => {
  const { cart } = useCartState()

  const router = useRouter()

  return (
    <Drawer size="sm" isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton color="white" />
        <DrawerHeader bgColor="primaryColor" color="white">
          Carrinho de compras
        </DrawerHeader>

        <DrawerBody overflow="auto">
          <Box mt="5">
            {cart.products.length === 0 ? (
              <EmptyCartView />
            ) : (
              cart.products.map((product, index) => (
                <ProductInput key={product.id} product={product} cartIndex={index} />
              ))
            )}
          </Box>
        </DrawerBody>

        <DrawerFooter justifyContent="none">
          <Box w="100%">
            <Text fontWeight="bold">Total: </Text>
            <Text fontWeight="bold">{currency(cart.total)}</Text>
          </Box>
          <AppButton
            w="100%"
            disabled={cart.products.length === 0}
            _hover={{ bgColor: 'secondaryColor' }}
            onClick={() => router.push(`${storeName}/checkout`)}
          >
            Finalizar a compra
          </AppButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CartDrawer
