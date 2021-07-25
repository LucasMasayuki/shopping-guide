import { useRouter } from 'next/router'
import Head from 'next/head'

import Layout from '@/src/ui/components/layout'
import React from 'react'
import AppBar from '@/src/ui/components/app-bar'
import CheckoutDoneBox from '@/src/ui/page-components/checkout-done/checkout-done-box'

const Checkout = (): JSX.Element => {
  const router = useRouter()

  const { name } = router.query

  return (
    <>
      <Layout>
        <Head>
          <title>{name}</title>
        </Head>
        <AppBar />
        <CheckoutDoneBox />
      </Layout>
    </>
  )
}

export default Checkout
