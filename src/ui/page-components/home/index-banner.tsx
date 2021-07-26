import React from 'react'
import { Box, Grid, Heading, Input } from '@chakra-ui/react'
import makeRemoteSearchStoreByName from '@/src/main/usecases/remote-search-store-by-name-factory'
import { useStoresState } from '../../contexts-providers/store/stores-provider'

const IndexBanner = (): JSX.Element => {
  const { setStores } = useStoresState()

  const onBlur = async (event: React.FocusEvent<HTMLInputElement>): Promise<void> => {
    const { currentTarget } = event

    if (currentTarget) {
      const stores = await makeRemoteSearchStoreByName().search((currentTarget as HTMLInputElement).value)
      console.log('Lojas encontradas')
      console.log(stores)
      setStores(stores)
    }
  }

  return (
    <Grid
      backgroundImage="./shopping-entrance.jpg"
      backgroundRepeat="no-repeat"
      backgroundSize="100%"
      templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
      gap={4}
      h="md"
      pl="16"
      pr="16"
      alignItems="center"
      justifyItems="center"
    >
      <Input placeholder="Encontre sua loja" size="lg" background="white" onBlur={onBlur} />
      <Box textShadow="-1px 0 lightgrey, 0 1px lightgrey, 1px 0 lightgrey, 0 -1px lightgrey">
        <Heading as="h1" color="white" fontWeight="bold">
          Seja bem vindo,
        </Heading>
        <Heading as="h1" color="white" fontWeight="bold">
          Encontre sua loja preferida
        </Heading>
      </Box>
    </Grid>
  )
}

export default IndexBanner
