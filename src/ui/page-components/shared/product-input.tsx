import { Product } from '@/src/domain/models/product-model'
import makeLocalDeleteProductOfCart from '@/src/main/usecases/local-delete-product-of-cart-factory'
import { currency, getCartTotal } from '@/src/utils/utiltiies-functions'
import { CloseIcon, MinusIcon } from '@chakra-ui/icons'
import { Box, Grid, IconButton, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useCartState } from '../../contexts-providers/store/cart-provider'

type Props = {
  product: Product
  cartIndex: number
}

const ProductInput = ({ product, cartIndex }: Props): JSX.Element => {
  const { cart, setCart } = useCartState()
  const router = useRouter()
  let { name } = router.query

  const getPrice = (): string => {
    return currency(product.quantity * product.price)
  }

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
    if (Array.isArray(name)) {
      // eslint-disable-next-line prefer-destructuring
      name = name[0]
    }

    makeLocalDeleteProductOfCart().deleteProductOfCart(id, name ?? '')
    cart.products.splice(index, 1)
    cart.total = getCartTotal(cart)
    setCart({ ...cart })
  }

  return (
    <Box key={product.id}>
      <Box>
        <Grid
          gridTemplateColumns="15% 8% 6% 8% auto auto auto"
          mr="4"
          mb="8"
          alignItems="center"
          justifyItems="center"
          gap="2"
          w="100%"
        >
          <Image w="50" h="50" loading="lazy" src={product.photo} borderRadius="8" />
          <IconButton
            aria-label="Decrease"
            border="1px solid lightgray"
            borderRadius="30"
            disabled={product.quantity <= 1}
            onClick={() => onDecreaseProduct(cartIndex)}
            variant="none"
            size="xs"
            icon={<MinusIcon />}
          />
          <Text size="xs" textAlign="center">
            {product.quantity}
          </Text>
          <IconButton
            aria-label="Increase"
            border="1px solid lightgray"
            borderRadius="30"
            disabled={product.inStock <= product.quantity}
            onClick={() => onIncreaseProduct(cartIndex)}
            variant="none"
            size="xs"
            icon={<FaPlus />}
          />
          <Text fontSize="12px" isTruncated noofline={1}>
            {product.name}
          </Text>
          <Text fontSize="14px" fontWeight="bold" float="right">
            {getPrice()}
          </Text>
          <IconButton
            color="red"
            aria-label="Delete"
            onClick={() => onDeleteProduct(product.id, cartIndex)}
            variant="none"
            size="xs"
            icon={<CloseIcon />}
          />
        </Grid>
      </Box>
    </Box>
  )
}

export default ProductInput
