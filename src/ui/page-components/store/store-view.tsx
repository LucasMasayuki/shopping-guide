import React, { useEffect } from 'react'

import { Box } from '@chakra-ui/react'

import { Store } from '@/src/domain/models/store-model'
import AppBar from '@/src/ui/components/app-bar'
import CartIcon from '@/src/ui/page-components/store/cart-icon'
import ProductList from '@/src/ui/page-components/store/product-list'
import { groupBy } from '@/src/utils/utiltiies-functions'
import makeLocalGetCart from '@/src/main/usecases/local-get-cart-factory'
import { Cart } from '@/src/domain/models/cart-model'
import { useCartState } from '@/src/ui/contexts-providers/store/cart-provider'

type Props = {
  store: Store | null
}

// eslint-disable-next-line no-unused-vars
const StoreView = ({ store }: Props): JSX.Element => {
  const { setCart } = useCartState()

  useEffect(() => {
    makeLocalGetCart()
      .getCart()
      .then((localCart: Cart) => {
        setCart(localCart)
      })
  }, [setCart])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categories = groupBy(store?.products ?? [], (i: { category: any }) => i.category)

  return (
    <>
      <AppBar drawerElement={<CartIcon storeName={store?.name ?? ''} />} />
      <Box
        backgroundImage={store?.photo ?? ''}
        backgroundRepeat="no-repeat"
        backgroundSize="100%"
        d="grid"
        h="md"
        pl="16"
        pr="16"
        alignItems="center"
        justifyItems="center"
        mt="72px"
      >
        <Box backgroundColor="white" w="80%" h="200" borderRadius="10">
          <Box />
        </Box>
      </Box>
      <Box p="16" top="-10" borderRadius="30" background="white" position="relative">
        <ProductList categories={categories} />
      </Box>
    </>
  )
}

export default StoreView
