import makeLocalDeleteProductOfCart from '@/src/main/usecases/local-delete-product-of-cart-factory'
import { currency, getCartTotal } from '@/src/utils/utiltiies-functions'
import { MinusIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  IconButton,
  Image,
  Input,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { useCartState } from '../../contexts-providers/store/cart-provider'

type Props = {
  onClose: () => void
  isOpen: boolean
}

const CartDrawer = ({ onClose, isOpen }: Props): JSX.Element => {
  const { cart, setCart } = useCartState()

  const onIncreaseProduct = (index: number): void => {
    cart.products[index].quantity += 1
    cart.total = getCartTotal(cart)
    setCart({ ...cart })
  }

  const onDecreaseProduct = (index: number): void => {
    cart.products[index].quantity -= 1
    cart.total = getCartTotal(cart)
    setCart({ ...cart })
  }

  const onDeleteProduct = (id: number, index: number): void => {
    makeLocalDeleteProductOfCart().deleteProductOfCart(id)
    cart.products.splice(index, 1)
    cart.total = getCartTotal(cart)
    setCart({ ...cart })
  }

  const onChangeQuantity = (event: any, index: number): void => {
    const { value } = event.currentTarget
    cart.products[index].quantity = value
    cart.total = getCartTotal(cart)
    setCart({ ...cart })
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton color="white" />
        <DrawerHeader bgColor="primaryColor" color="white">
          Carrinho de compras
        </DrawerHeader>

        <DrawerBody overflow="auto">
          <Box mt="5">
            {cart.products.map((product, index) => {
              const getPrice = (): string => {
                return currency(product.quantity * product.price)
              }

              return (
                <Box key={product.id}>
                  <Box>
                    <Grid
                      gridTemplateColumns="50px 10px 30px 10px auto auto"
                      mr="4"
                      alignItems="center"
                      justifyItems="center"
                      gap="2"
                      w="100%"
                    >
                      <Image w="50" h="50" loading="lazy" src={product.photo} borderRadius="8" />
                      <IconButton
                        aria-label="Decrease"
                        disabled={product.quantity <= 1}
                        onClick={() => onDecreaseProduct(index)}
                        variant="none"
                        size="xs"
                        icon={<MinusIcon />}
                      />
                      <Input
                        value={product.quantity}
                        size="xs"
                        textAlign="center"
                        onChange={(event: any) => onChangeQuantity(event, index)}
                      />
                      <IconButton
                        aria-label="Increase"
                        disabled={product.inStock <= product.quantity}
                        onClick={() => onIncreaseProduct(index)}
                        variant="none"
                        size="xs"
                        icon={<FaPlus />}
                      />
                      <Text fontSize="12px" isTruncated noofline={1}>
                        {product.name}
                      </Text>
                      <IconButton
                        color="red"
                        aria-label="Delete"
                        disabled={product.inStock <= product.quantity}
                        onClick={() => onDeleteProduct(product.id, index)}
                        variant="none"
                        size="xs"
                        icon={<FaTrash />}
                      />
                    </Grid>
                    <Text fontSize="14px" fontWeight="bold" float="right">
                      {getPrice()}
                    </Text>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </DrawerBody>

        <DrawerFooter justifyContent="none">
          <Box w="80%">
            <Text fontWeight="bold">Total: </Text>
            <Text fontWeight="bold">{currency(cart.total)}</Text>
          </Box>
          <Button w="100%" bgColor="secondaryColor" color="white" borderRadius="30" justifySelf="flex-end">
            Finalizar a compra
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CartDrawer
