import React from 'react'
import NextLink from 'next/link'
import { Badge, Box, Image } from '@chakra-ui/react'
import { Store } from '@/src/domain/models/store-model'

type Props = {
  store: Store
}

const StoreCard = ({ store }: Props): JSX.Element => {
  return (
    <NextLink href="/..." as={`/store/${store.name}`} passHref>
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="0 2px 4px 0 rgb(0 0 0 / 10%)"
        cursor="pointer"
        _hover={{ bg: 'hsla(0,0%,62%,.2)' }}
      >
        <Image loading="lazy" src={store.photo ?? ''} h="200" w="100%" />

        <Box p="6">
          <Box fontWeight="semibold" fontSize="24" lineHeight="tight" isTruncated>
            {store.name}
          </Box>
          <Badge bgColor={store.activity} borderRadius="8px" pr="2" pl="2" color="white">
            {store.activity}
          </Badge>

          <Box mt="3" fontSize="12" lineHeight="tight" isTruncated noOfLines={4} whiteSpace="normal">
            {store.description}
          </Box>
        </Box>
      </Box>
    </NextLink>
  )
}

export default StoreCard
