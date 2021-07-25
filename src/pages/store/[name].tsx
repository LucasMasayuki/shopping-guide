/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'

import makeRemoteGetStore from '@/src/main/usecases/remote-get-store-factory'
import { Store } from '@/src/domain/models/store-model'
import Layout from '@/src/ui/components/layout'
import makeRemoteGetAllStores from '@/src/main/usecases/remote-get-all-stores-factory'
import { OrderBy } from '@/src/domain/usecases/get-all-stores'
import { CartStateProvider } from '@/src/ui/contexts-providers/store/cart-provider'
import React, { useEffect, useState } from 'react'
import StoreView from '@/src/ui/page-components/store/store-view'
import { CircularProgress } from '@chakra-ui/react'
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
const StorePage = ({ store, errorCode }: Props): JSX.Element => {
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
              <title>{store?.name}</title>
            </Head>
            <StoreView store={store} />
          </Layout>
        </CartStateProvider>
      )}
    </>
  )
}

export default StorePage

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
    fallback: false,
  }
}
