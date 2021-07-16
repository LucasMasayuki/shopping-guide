import React from 'react'
import { Box, Grid, Heading, Input } from '@chakra-ui/react'

const IndexBanner = (): JSX.Element => {
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
      <Input placeholder="Encontre sua loja" size="lg" background="white" />
      <Box>
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
