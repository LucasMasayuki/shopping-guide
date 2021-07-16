import React from 'react'
import { Box, Grid, GridItem, Icon, IconButton, Link, SimpleGrid, Text, Heading } from '@chakra-ui/react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { APP_NAME } from '@/src/utils/app-settings'

const Footer = (): JSX.Element => (
  <footer>
    <Box bgColor="primaryColor" color="white" pr={4} pl={4} pb={2} pt={2}>
      <SimpleGrid columns={2} spacing={10} alignItems="center">
        <Heading size="sm" fontWeight="bold">
          {APP_NAME}
        </Heading>
        <Grid templateColumns="repeat(5, 1fr)">
          <GridItem colStart={6} colEnd={6}>
            <Text fontSize="xs">Created by Lucas Masayuki</Text>
          </GridItem>
          <GridItem colStart={6} colEnd={6} textAlign="right">
            <Link href="https://github.com/LucasMasayuki" isExternal>
              <IconButton variant="none" aria-label="My personal github" icon={<Icon as={FaGithub} />} size="md" />
            </Link>
            <Link href="https://br.linkedin.com/in/lucas-tamaribuchi" isExternal>
              <IconButton variant="none" aria-label="My Linkedin" icon={<Icon as={FaLinkedin} />} size="md" />
            </Link>
          </GridItem>
        </Grid>
      </SimpleGrid>
    </Box>
  </footer>
)

export default Footer
