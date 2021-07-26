import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'

import { Store } from '@/src/domain/models/store-model'
import Layout from '@/src/ui/components/layout'
import makeRemoteGetAllStores from '@/src/main/usecases/remote-get-all-stores-factory'
import { OrderBy } from '@/src/domain/usecases/get-all-stores'
import { CartStateProvider } from '@/src/ui/contexts-providers/store/cart-provider'
import React, { useEffect, useState } from 'react'
import StoreView from '@/src/ui/page-components/store/store-view'
import { CircularProgress } from '@chakra-ui/react'
import makeRemoteGetProductsOfStore from '@/src/main/usecases/remote-get-products-of-store-factory'
import { Product } from '@/src/domain/models/product-model'

type Props = {
  storePageProps: {
    storePhoto: string
    products: Array<Product>
  }
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
    storePageProps: {
      storePhoto: string
      products: Array<Product>
    }
    errorCode: number | null
  }
}

const StorePage = ({ storePageProps, errorCode }: Props): JSX.Element => {
  const router = useRouter()
  const [storeName, setStoreName] = useState('')

  useEffect(() => {
    if (router.isReady) {
      let { name } = router.query

      if (Array.isArray(name)) {
        // eslint-disable-next-line prefer-destructuring
        name = name[0]
      }

      setStoreName(name ?? '')
    }
  }, [setStoreName, router])

  if (!router.isFallback && errorCode) {
    return <ErrorPage statusCode={errorCode} />
  }

  return (
    <>
      {storeName === '' ? (
        <CircularProgress />
      ) : (
        <CartStateProvider>
          <Layout>
            <Head>
              <title>{storeName}</title>
            </Head>
            <StoreView storePageProps={storePageProps} />
          </Layout>
        </CartStateProvider>
      )}
    </>
  )
}

export default StorePage

export async function getStaticProps({ params }: Params): Promise<StaticProps> {
  let errorCode = null
  let products: Array<Product> = []
  let storePhoto = ''

  try {
    const stores = await makeRemoteGetAllStores().getAllStores(OrderBy.NAME)
    const selectedStore = stores.filter((store) => {
      return store.name === params.name
    })

    products = await makeRemoteGetProductsOfStore().getProdcuts(selectedStore[0].about)
    storePhoto = selectedStore[0].photo !== null ? selectedStore[0].photo : ''
  } catch (error) {
    errorCode = error.code
  }

  const storePageProps = {
    products,
    storePhoto,
  }

  return {
    props: {
      storePageProps,
      errorCode,
    },
  }
}

export async function getStaticPaths(): Promise<StaticPaths> {
  const stores = await makeRemoteGetAllStores().getAllStores(OrderBy.NAME)

  return {
    paths: stores.map((store: Store) => ({
      params: {
        name: store.name,
      },
    })),
    fallback: false,
  }
}
