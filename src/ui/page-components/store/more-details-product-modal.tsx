import { Product } from '@/src/domain/models/product-model'
import { currency } from '@/src/utils/utiltiies-functions'
import { MinusIcon } from '@chakra-ui/icons'
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Image,
  Text,
  Grid,
  IconButton,
} from '@chakra-ui/react'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import AppButton from '../shared/app-button'

type Props = {
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product) => void
  product: Product
}

const MoreDetailsProductModal = ({ isOpen, onClose, product, onAddToCart }: Props): JSX.Element => {
  const [quantity, setQuantity] = React.useState(1)

  const decreaseQuantity = (): void => {
    setQuantity(quantity - 1)
  }

  const increaseQuantity = (): void => {
    setQuantity(quantity + 1)
  }

  const getPrice = (): string => {
    return currency(quantity * product.price)
  }

  const onAdd = (): void => {
    const chosenProduct = {
      ...product,
      quantity,
    }
    onAddToCart(chosenProduct)
    setQuantity(1)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Grid gridTemplateColumns="auto auto" gap="10">
              <Box d="flex" alignItems="center">
                <Image loading="lazy" src={product.photo ?? ''} h="200" w="150" borderRadius="8" />
              </Box>
              <Box h="100%">
                <Text fontSize="20" fontWeight="bold" mb="1rem" mt="1rem">
                  {product.name}
                </Text>
                <Text mb="1rem" mt="1rem" h="300px" overflow="auto">
                  {product.description}
                </Text>
              </Box>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Grid gridTemplateColumns="auto auto auto" border="1px solid lightgray" borderRadius="8" mr="4">
              <IconButton
                aria-label="Decrease"
                disabled={quantity <= 1}
                onClick={decreaseQuantity}
                variant="none"
                icon={<MinusIcon />}
                borderRight="1px solid lightgray"
              />
              <Text d="grid" alignItems="center" border="none" textAlign="center" w="45px">
                {quantity}
              </Text>
              <IconButton
                aria-label="Increase"
                disabled={product.inStock <= quantity}
                onClick={increaseQuantity}
                variant="none"
                icon={<FaPlus />}
                borderLeft="1px solid lightgray"
              />
            </Grid>
            <AppButton _hover={{ bgColor: 'secondaryColor' }} w="unset" onClick={onAdd}>
              Adicionar {getPrice()}
            </AppButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MoreDetailsProductModal
