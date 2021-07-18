import React from 'react'
import { Box, Grid, Heading } from '@chakra-ui/react'
import { Product } from '@/src/domain/models/product-model'
import ProductCard from './product-card'

type Props = {
  categories: GroupByCategory
}

type GroupByCategory = {
  [category: string]: Product[]
}

const ProductList = ({ categories }: Props): JSX.Element => {
  return (
    <>
      {Object.keys(categories).map((category: string) => {
        return (
          <Box key={category}>
            <Heading as="h5" fontSize="xl" mb="20" textTransform="uppercase">
              {category}
            </Heading>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} gap={16}>
              {categories[category].map((product: Product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </Grid>
          </Box>
        )
      })}
    </>
  )
}

export default ProductList
