/* eslint-disable react/jsx-no-comment-textnodes */
import Head from 'next/head'
import React, { ChangeEvent } from 'react'
import { Box, Grid, Select, Skeleton, Text } from '@chakra-ui/react'
import Dummies from '../dummies/stores-list-dummy.json'
import { Store } from '../domain/models/store-model'
// import makeRemoteGetAllStores from '../main/usecases/remote-get-all-stores-factory'
import AppBar from '../ui/components/app-bar'
import Layout from '../ui/components/layout'
import { APP_NAME } from '../utils/app-settings'
import IndexBanner from '../ui/page-components/home/index-banner'
import StoresList from '../ui/page-components/home/stores-list'

type Props = {
  allStores: Store[]
}

type StaticProps = {
  props: {
    allStores: Store[]
  }
}

const Index = ({ allStores }: Props): JSX.Element => {
  const [stores, setStores] = React.useState(allStores)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChange = (selectedElement: ChangeEvent<HTMLSelectElement>): void => {
    // const { value } = selectedElement.target
    // eslint-disable-next-line no-console
    //   const allStores = await makeRemoteGetAllStores().getAllStores(value)
    setStores(Dummies.stores.slice(0, 2))
  }

  return (
    <>
      <Layout>
        <Head>
          <title>{APP_NAME}</title>
        </Head>
        <AppBar />
        <IndexBanner />

        <Box p="16" top="-10" borderRadius="30" background="white" position="relative">
          <Grid gridTemplateColumns="35% 45%" width="250px" ml="12" mb="12" alignItems="center">
            <Text fontSize="14">Ordenar por:</Text>
            <Select defaultValue="name" size="sm" onChange={onChange}>
              <option value="name">Nome</option>
              <option value="activity">Atividade</option>
            </Select>
          </Grid>

          <Skeleton isLoaded={stores.length > 0}>
            <StoresList stores={stores} />
          </Skeleton>
        </Box>
      </Layout>
    </>
  )
}

export default Index

export const getServerSideProps = async (): Promise<StaticProps> => {
  //   const allStores = await makeRemoteGetAllStores().getAllStores('name')
  const allStores = Dummies.stores

  return {
    props: { allStores },
  }
}
