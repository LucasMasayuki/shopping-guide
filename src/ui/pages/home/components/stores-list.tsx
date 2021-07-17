import React from 'react'
import { Grid } from '@chakra-ui/react'
import { StoreModel } from '@/src/domain/models/store-model'
import StoreCard from './store-card'

type Props = {
  stores: StoreModel[]
}

const StoresList = ({ stores }: Props): JSX.Element => {
  return (
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} gap={16} justifyItems="center">
      {stores.map((store: StoreModel) => (
        <StoreCard key={store.name} store={store} />
      ))}
    </Grid>
  )
}

export default StoresList
