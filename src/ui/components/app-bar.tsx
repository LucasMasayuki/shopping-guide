import React from 'react'
import { Flex, Box, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { APP_NAME } from '@/src/utils/app-settings'

const AppBar = (): JSX.Element => (
  <Box
    bgColor="primaryColor"
    w="100%"
    color="white"
    p={4}
    boxShadow="0 5px 5px 0 rgb(0 0 0 / 6%), 0 1px 10px 0 rgb(0 0 0 / 6%), 0 2px 4px -1px rgb(0 0 0 / 6%)"
    position="fixed"
    top="0"
    zIndex="1000"
  >
    <Flex>
      <Box p="2">
        <Heading size="md" fontWeight="bold" font-fontFamily="system-ui">
          <Link as="/" href="/" passHref>
            {APP_NAME}
          </Link>
        </Heading>
      </Box>
    </Flex>
  </Box>
)

export default AppBar
