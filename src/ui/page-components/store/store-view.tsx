import React, { useEffect } from 'react'

import { Box } from '@chakra-ui/react'

import AppBar from '@/src/ui/components/app-bar'
import CartIcon from '@/src/ui/page-components/store/cart-icon'
import ProductList from '@/src/ui/page-components/store/product-list'
import { groupBy } from '@/src/utils/utiltiies-functions'
import makeLocalGetCart from '@/src/main/usecases/local-get-cart-factory'
import { Cart } from '@/src/domain/models/cart-model'
import { useCartState } from '@/src/ui/contexts-providers/store/cart-provider'
import { useRouter } from 'next/router'
import { Product } from '@/src/domain/models/product-model'
import makeRemoteGetCart from '@/src/main/usecases/remote-get-cart'
import LocationGuideInstructions from './location-guide-instructions'

type Props = {
  storePageProps: {
    products: Array<Product>
    storePhoto: string
  }
}

// eslint-disable-next-line no-unused-vars
const StoreView = ({ storePageProps }: Props): JSX.Element => {
  const { setCart } = useCartState()
  const router = useRouter()
  let { name } = router.query

  useEffect(() => {
    if (Array.isArray(name)) {
      // eslint-disable-next-line prefer-destructuring
      name = name[0]
    }

    makeLocalGetCart()
      .getCart(name ?? '')
      .then((localCart: Cart) => {
        if (localCart.about !== '') {
          makeRemoteGetCart()
            .getCart(localCart.about)
            .then((remoteCart) => {
              console.log('Carrinho atual')
              console.log(remoteCart)
              setCart(remoteCart)
            })
        } else {
          console.log('Carrinho atual')
          console.log(localCart)
          setCart(localCart)
        }
      })
  }, [setCart])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categories = groupBy(storePageProps.products, (i: { category: any }) => i.category)

  return (
    <>
      <AppBar drawerElement={<CartIcon />} />
      <Box
        backgroundImage={storePageProps.storePhoto}
        backgroundRepeat="no-repeat"
        backgroundSize="100%"
        d="grid"
        h="xl"
        pl="16"
        pr="16"
        alignItems="center"
        justifyItems="center"
        mt="72px"
      >
        <Box backgroundColor="white" w="80%" h="450" borderRadius="10">
          <LocationGuideInstructions />
        </Box>
      </Box>
      <Box p="16" top="-10" borderRadius="30" background="white" position="relative">
        <ProductList categories={categories} />
      </Box>
    </>
  )
}

export default StoreView
