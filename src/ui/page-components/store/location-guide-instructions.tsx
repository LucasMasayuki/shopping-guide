/* eslint-disable @typescript-eslint/no-unused-vars */
import { LocationGuide } from '@/src/domain/models/location-guide-model'
import makeRemoteGetLocationGuide from '@/src/main/usecases/remote-get-location-guide-factory'
import { Box, Text, Image, Grid, Heading, CircularProgress } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Dummy from '../../../dummies/location-guide-dummy.json'

const LocationGuideInstructions = (): JSX.Element => {
  const router = useRouter()
  let { name } = router.query
  const [locationGuide, setLocationGuide] = useState({} as LocationGuide)

  useEffect(() => {
    if (Array.isArray(name)) {
      // eslint-disable-next-line prefer-destructuring
      name = name[0]
    }

    makeRemoteGetLocationGuide()
      .getLocationGuide(name ?? '')
      .then((remoteLocationGuide: LocationGuide) => {
        setLocationGuide(remoteLocationGuide)
      })
  }, [setLocationGuide, name])

  return (
    <Box textAlign="center">
      <Text fontSize="2xl" fontWeight="bold" mt="4" mb="4">
        Como chegar na loja {name}
      </Text>
      <Grid gridTemplateColumns="auto auto" gap="2" alignItems="center">
        <Box p="4" h="350">
          <Image
            borderRadius="30"
            loading="lazy"
            h="300"
            src="https://boulevardcampos.com.br/data/files/32/B5/B9/DD/9F2F561014142B5653DBF9C2/mapa_campos2018.jpg"
          />
        </Box>
        <Box p="4" textAlign="left">
          <Box d="flex" justifyItems="begin">
            <Text fontWeight="bold" mb="4" mr="2">
              Andar:
            </Text>
            <Text>{locationGuide.floor}</Text>
          </Box>
          <Box d="flex" justifyItems="begin">
            <Text fontWeight="bold" mb="4" mr="2">
              Bloco:
            </Text>
            <Text>{locationGuide.bloc}</Text>
          </Box>
          <Box d="flex" justifyItems="begin">
            <Text fontWeight="bold" mb="4" mr="2">
              Corredor:
            </Text>
            <Text>{locationGuide.hall}</Text>
          </Box>
          <Box d="flex" justifyItems="begin">
            <Text fontWeight="bold" mb="4" mr="2">
              Escada mais próxima:
            </Text>
            <Text>{locationGuide.nearestLadder}</Text>
          </Box>
          <Box d="flex" justifyItems="begin">
            <Text fontWeight="bold" mb="4" mr="2">
              Caminho com escadas:
            </Text>
            <Text>{locationGuide.path}</Text>
          </Box>
          <Box d="flex" justifyItems="begin">
            <Text fontWeight="bold" mb="4" mr="2">
              Caminho com elevador:
            </Text>
            <Text>{locationGuide.pathM}</Text>
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}

export default LocationGuideInstructions
