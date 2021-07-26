/* eslint-disable react/jsx-no-comment-textnodes */
import Head from 'next/head'
import React, { ChangeEvent, useEffect } from 'react'
import { Box, Grid, Select, Skeleton, Text } from '@chakra-ui/react'
import { Store } from '../domain/models/store-model'
import AppBar from '../ui/components/app-bar'
import Layout from '../ui/components/layout'
import { APP_NAME } from '../utils/app-settings'
import IndexBanner from '../ui/page-components/home/index-banner'
import StoresList from '../ui/page-components/home/stores-list'
import makeRemoteGetAllStores from '../main/usecases/remote-get-all-stores-factory'
import { OrderBy } from '../domain/usecases/get-all-stores'

const Index = (): JSX.Element => {
  const emptyStores: Store[] = []
  const [stores, setStores] = React.useState(emptyStores)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChange = async (selectedElement: ChangeEvent<HTMLSelectElement>): Promise<void> => {
    const { value } = selectedElement.target
    const responseStores = await makeRemoteGetAllStores().getAllStores(value as OrderBy)
    setStores(responseStores)
  }

  useEffect(() => {
    makeRemoteGetAllStores()
      .getAllStores(OrderBy.NAME)
      .then((response) => {
        setStores(response)
      })
  }, [setStores])

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
              <option value={OrderBy.NAME}>Nome</option>
              <option value={OrderBy.ACTIVITY}>Atividade</option>
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
