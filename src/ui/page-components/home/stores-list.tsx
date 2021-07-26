import React, { useEffect } from 'react'
import { Grid, Skeleton } from '@chakra-ui/react'
import { Store } from '@/src/domain/models/store-model'
import makeRemoteGetAllStores from '@/src/main/usecases/remote-get-all-stores-factory'
import { OrderBy } from '@/src/domain/usecases/get-all-stores'
import StoreCard from './store-card'
import { useStoresState } from '../../contexts-providers/store/stores-provider'

const StoresList = (): JSX.Element => {
  const { stores, setStores } = useStoresState()

  useEffect(() => {
    makeRemoteGetAllStores()
      .getAllStores(OrderBy.NAME)
      .then((response) => {
        setStores(response)
      })
  }, [setStores])

  return (
    <Skeleton isLoaded={stores.length > 0}>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} gap={16} justifyItems="center">
        {stores.map((store: Store) => (
          <StoreCard key={store.name} store={store} />
        ))}
      </Grid>
    </Skeleton>
  )
}

export default StoresList
