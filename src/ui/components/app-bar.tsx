import React from 'react'
import { Box, Heading, Grid } from '@chakra-ui/react'
import Link from 'next/link'
import { APP_NAME } from '@/src/utils/app-settings'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

type Props = {
  drawerElement?: React.ReactNode
  showBackButton?: boolean
}

const AppBar = ({ drawerElement, showBackButton }: Props): JSX.Element => {
  const gridTemplateColumns = showBackButton ? '3% auto auto' : 'auto auto'
  const router = useRouter()

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
      <Grid alignItems="center" gridTemplateColumns={gridTemplateColumns}>
        {showBackButton ? <ArrowBackIcon cursor="pointer" fontSize="3xl" onClick={() => router.back()} /> : null}
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
  showBackButton: false,
}

export default AppBar
