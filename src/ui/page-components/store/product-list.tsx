import React from 'react'
import { Box, Grid, Heading } from '@chakra-ui/react'
import { Product } from '@/src/domain/models/product-model'
import { Cart } from '@/src/domain/models/cart-model'
import ProductCard from './product-card'

type Props = {
  categories: GroupByCategory
  setCart: React.Dispatch<React.SetStateAction<Cart>>
}

type GroupByCategory = {
  [category: string]: Product[]
}

const ProductList = ({ categories, setCart }: Props): JSX.Element => {
  return (
    <>
      {Object.keys(categories).map((category: string) => {
        return (
          <Box key={category}>
            <Heading as="h5" fontSize="xl" mb="10" textTransform="uppercase">
              {category}
            </Heading>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} gap={16}>
              {categories[category].map((product: Product) => (
                <ProductCard key={product.name} product={product} setCart={setCart} />
              ))}
            </Grid>
          </Box>
        )
      })}
    </>
  )
}

export default ProductList
