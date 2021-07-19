/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

import { Box, Skeleton } from '@chakra-ui/react'

import makeRemoteGetStore from '@/src/main/usecases/remote-get-store-factory'
import { Store } from '@/src/domain/models/store-model'
import Layout from '@/src/ui/components/layout'
import AppBar from '@/src/ui/components/app-bar'
import makeRemoteGetAllStores from '@/src/main/usecases/remote-get-all-stores-factory'
import { OrderBy } from '@/src/domain/usecases/get-all-stores'
import CartIcon from '@/src/ui/page-components/store/cart-icon'
import ProductList from '@/src/ui/page-components/store/product-list'
import { groupBy } from '@/src/utils/utiltiies-functions'
import makeLocalGetCart from '@/src/main/usecases/local-get-cart-factory'
import { Cart } from '@/src/domain/models/cart-model'
import { Product } from '@/src/domain/models/product-model'
import Dummies from '../../dummies/stores-list-dummy.json'

type Props = {
  store: Store | null
  errorCode: number | null
}

type Params = {
  params: {
    name: string
  }
}

type StaticPaths = {
  paths: {
    params: {
      name: string
    }
  }[]
  fallback: boolean
}

type StaticProps = {
  props: {
    store: Store | null
    errorCode: number | null
  }
}

// eslint-disable-next-line no-unused-vars
const StoreView = ({ store, errorCode }: Props): JSX.Element => {
  const products: Product[] = []
  const [cart, setCart] = useState({ total: 0, products })

  useEffect(() => {
    makeLocalGetCart()
      .getCart()
      .then((localCart: Cart) => setCart(localCart))
  }, [])

  const router = useRouter()

  if (!router.isFallback && errorCode) {
    return <ErrorPage statusCode={errorCode} />
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categories = groupBy(store?.products ?? [], (i: { category: any }) => i.category)

  return (
    <>
      <Layout>
        <Head>
          <title>{store?.name}</title>
        </Head>
        <AppBar drawerElement={<CartIcon cart={cart} />} />
        <Skeleton isLoaded={!router.isFallback} mt="72px">
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
          >
            <Box backgroundColor="white" w="80%" h="200" borderRadius="10">
              <Box />
            </Box>
          </Box>
          <Box p="16" top="-10" borderRadius="30" background="white" position="relative">
            <ProductList categories={categories} setCart={setCart} />
          </Box>
        </Skeleton>
      </Layout>
    </>
  )
}

export default StoreView

export async function getStaticProps({ params }: Params): Promise<StaticProps> {
  const [store] = Dummies.stores
  let errorCode = null

  try {
    // store = await makeRemoteGetStore().getStore(params.name)
  } catch (error) {
    errorCode = error.code
  }

  return {
    props: {
      store,
      errorCode,
    },
  }
}

export async function getStaticPaths(): Promise<StaticPaths> {
  // const stores = await makeRemoteGetAllStores().getAllStores(OrderBy.NAME)
  const { stores } = Dummies

  return {
    paths: stores.map((store: Store) => ({
      params: {
        name: store.name,
      },
    })),
    fallback: true,
  }
}
