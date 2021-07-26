/* eslint-disable react/jsx-no-comment-textnodes */
import Head from 'next/head'
import React from 'react'
import { Box } from '@chakra-ui/react'
import AppBar from '../ui/components/app-bar'
import Layout from '../ui/components/layout'
import { APP_NAME } from '../utils/app-settings'
import IndexBanner from '../ui/page-components/home/index-banner'
import { StoresStateProvider } from '../ui/contexts-providers/store/stores-provider'
import SelectOrderByStores from '../ui/page-components/home/select-order-by-stores'
import StoresList from '../ui/page-components/home/stores-list'

const Index = (): JSX.Element => {
  return (
    <>
      <Layout>
        <StoresStateProvider>
          <Head>
            <title>{APP_NAME}</title>
          </Head>
          <AppBar />
          <IndexBanner />

          <Box p="16" top="-10" borderRadius="30" background="white" position="relative">
            <SelectOrderByStores />
            <StoresList />
          </Box>
        </StoresStateProvider>
      </Layout>
    </>
  )
}

export default Index
