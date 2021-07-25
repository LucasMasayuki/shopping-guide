import React from 'react'
import { Box, Grid, Image, useDisclosure } from '@chakra-ui/react'
import { Product } from '@/src/domain/models/product-model'
import { currency, getCartTotal } from '@/src/utils/utiltiies-functions'
import makeLocalAddProductToCart from '@/src/main/usecases/local-add-product-to-cart-factory'
import { useRouter } from 'next/router'
import MoreDetailsProductModal from './more-details-product-modal'
import { useCartState } from '../../contexts-providers/store/cart-provider'

type Props = {
  product: Product
}

const ProductCard = ({ product }: Props): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setCart } = useCartState()
  const router = useRouter()
  let { name } = router.query

  const onAddToCart = async (toAddProduct: Product): Promise<void> => {
    if (Array.isArray(name)) {
      // eslint-disable-next-line prefer-destructuring
      name = name[0]
    }

    const cart = await makeLocalAddProductToCart().addProductToCart(toAddProduct, name ?? '')
    setCart({ ...cart, total: getCartTotal(cart) })

    onClose()
  }

  return (
    <Grid
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="0 2px 4px 0 rgb(0 0 0 / 10%)"
      gridGap="4"
      gridTemplateColumns="68% 30%"
      cursor="pointer"
      p="6"
      onClick={onOpen}
      _hover={{ bg: 'hsla(0,0%,62%,.2)' }}
    >
      <Box>
        <MoreDetailsProductModal isOpen={isOpen} onClose={onClose} onAddToCart={onAddToCart} product={product} />
        <Box fontWeight="semibold" fontSize="xl" lineHeight="tight" isTruncated>
          {product.name}
        </Box>

        <Box mt="3" fontSize="12" lineHeight="tight" isTruncated noOfLines={3} whiteSpace="normal">
          {product.description}
        </Box>

        <Box mt="3" fontSize="12">
          <b>{product.inStock} produtos</b> no estoque
        </Box>

        <Box mt="2" fontSize="xl" fontWeight="bold">
          {currency(product.price)}
        </Box>
      </Box>

      <Box d="flex" alignItems="center">
        <Image loading="lazy" src={product.photo ?? ''} h="150" w="150" borderRadius="8" />
      </Box>
    </Grid>
  )
}

export default ProductCard
