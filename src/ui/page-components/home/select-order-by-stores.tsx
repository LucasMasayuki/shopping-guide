/* eslint-disable react/jsx-no-comment-textnodes */
import React, { ChangeEvent } from 'react'
import { Grid, Select, Text } from '@chakra-ui/react'
import makeRemoteGetAllStores from '@/src/main/usecases/remote-get-all-stores-factory'
import { OrderBy } from '@/src/domain/usecases/get-all-stores'
import { useStoresState } from '../../contexts-providers/store/stores-provider'

const SelectOrderByStores = (): JSX.Element => {
  const { setStores } = useStoresState()

  const onChange = async (selectedElement: ChangeEvent<HTMLSelectElement>): Promise<void> => {
    const { value } = selectedElement.target
    const responseStores = await makeRemoteGetAllStores().getAllStores(value as OrderBy)
    console.log('Lojas ordenadas')
    console.log(responseStores)
    setStores(responseStores)
  }

  return (
    <>
      <Grid gridTemplateColumns="35% 45%" width="250px" ml="12" mb="12" alignItems="center">
        <Text fontSize="14">Ordenar por:</Text>
        <Select defaultValue="name" size="sm" onChange={onChange}>
          <option value={OrderBy.NAME}>Nome</option>
          <option value={OrderBy.ACTIVITY}>Atividade</option>
        </Select>
      </Grid>
    </>
  )
}

export default SelectOrderByStores
