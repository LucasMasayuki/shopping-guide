import { useRouter } from 'next/router'
import Head from 'next/head'

import Layout from '@/src/ui/components/layout'
import React from 'react'
import AppBar from '@/src/ui/components/app-bar'
import { AuthStateProvider } from '@/src/ui/contexts-providers/store/auth-provider'
import CheckoutView from '@/src/ui/page-components/checkout/checkout-view'

const Checkout = (): JSX.Element => {
  const router = useRouter()

  const { name } = router.query

  return (
    <>
      <AuthStateProvider>
        <Layout>
          <Head>
            <title>{name}</title>
          </Head>
          <AppBar showBackButton />
          <CheckoutView />
        </Layout>
      </AuthStateProvider>
    </>
  )
}

export default Checkout
