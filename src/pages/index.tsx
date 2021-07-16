/* eslint-disable react/jsx-no-comment-textnodes */
import Head from 'next/head'
import React from 'react'
import { Box, Skeleton } from '@chakra-ui/react'
import Dummies from '../dummies/stores-list-dummy.json'
import { StoreModel } from '../domain/models/store-model'
// import makeRemoteGetAllStores from '../main/usecases/remote-get-all-stores-factory'
import AppBar from '../ui/components/app-bar'
import Layout from '../ui/components/layout'
import { APP_NAME } from '../utils/app-settings'
import StoresList from './home/components/stores-list'
import IndexBanner from './home/components/index-banner'

type Props = {
  allStores: StoreModel[]
}

type StaticProps = {
  props: {
    allStores: StoreModel[]
  }
}

const Index = ({ allStores }: Props): JSX.Element => {
  return (
    <>
      <Layout>
        <Head>
          <title>{APP_NAME}</title>
        </Head>
        <AppBar />
        <IndexBanner />

        <Box p="16" top="-10" borderRadius="30" background="white" position="relative">
          <Skeleton isLoaded={allStores.length > 0}>
            <StoresList stores={allStores} />
          </Skeleton>
        </Box>
      </Layout>
    </>
  )
}

export default Index

export const getServerSideProps = async (): Promise<StaticProps> => {
  //   const allStores = await makeRemoteGetAllStores().getAllStores()
  const allStores = Dummies.stores

  return {
    props: { allStores },
  }
}
