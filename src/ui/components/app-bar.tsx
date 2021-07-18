import React from 'react'
import { Box, Heading, Grid } from '@chakra-ui/react'
import Link from 'next/link'
import { APP_NAME } from '@/src/utils/app-settings'

type Props = {
  drawerElement?: React.ReactNode
}

const AppBar = ({ drawerElement }: Props): JSX.Element => {
  return (
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
      <Grid alignItems="center" gridTemplateColumns="auto auto">
        <Box p="2">
          <Heading size="md" fontWeight="bold" fontFamily="system-ui">
            <Link as="/" href="/" passHref>
              {APP_NAME}
            </Link>
          </Heading>
        </Box>
        <Box textAlign="right" cursor="pointer">
          {drawerElement}
        </Box>
      </Grid>
    </Box>
  )
}

AppBar.defaultProps = {
  drawerElement: null,
}

export default AppBar
