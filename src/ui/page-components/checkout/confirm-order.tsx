import React, { useEffect } from 'react'

import { Box, Button, Grid, Heading, useToast } from '@chakra-ui/react'
import makeLocalGetCart from '@/src/main/usecases/local-get-cart-factory'
import { Cart } from '@/src/domain/models/cart-model'
import { currency } from '@/src/utils/utiltiies-functions'
import { Formik, FormikHelpers } from 'formik'
import makeRemotePurchase from '@/src/main/usecases/remote-purchase-factory'
import { useRouter } from 'next/router'
import { useCartState } from '../../contexts-providers/store/cart-provider'
import ProductInput from '../shared/product-input'
import PaymentForm from './payment-form'

export type PaymentFormFields = {
  expireDate: string
  number: string
  fullName: string
  cvv: string
  takeoutPayment: string
}

const ConfirmOrder = (): JSX.Element => {
  const { cart, setCart } = useCartState()

  const router = useRouter()
  const toast = useToast()
  const { storeName } = router.query

  useEffect(() => {
    makeLocalGetCart()
      .getCart()
      .then((localCart: Cart) => {
        setCart(localCart)
      })
  }, [setCart])

  const onSubmit = async (values: PaymentFormFields, actions: FormikHelpers<PaymentFormFields>): Promise<void> => {
    const purchaseParams = {
      cart,
      creditcard: {
        cvv: values.cvv,
        number: values.number,
        name: values.fullName,
        expireDate: values.expireDate,
      },
      takeoutPayment: values.takeoutPayment !== '' ? values.takeoutPayment : null,
    }

    try {
      makeRemotePurchase().purchase(purchaseParams)
    } catch (e) {
      toast({
        title: `${e}`,
        status: 'error',
        isClosable: true,
      })

      actions.setSubmitting(false)
      return
    }

    actions.setSubmitting(false)
    router.push(`${storeName}/checkout-done`)
  }

  return (
    <>
      <Box backgroundColor="white" borderRadius="10" padding="10" w="100%" mt="72px">
        <Formik
          initialValues={{ fullName: '', number: '', cvv: '', expireDate: '', takeoutPayment: '' }}
          onSubmit={(values, actions) => onSubmit(values, actions)}
        >
          {(props) => (
            <Box>
              <Grid gridTemplateColumns="45% auto" gap="10" mb="5">
                <PaymentForm />
                <Box>
                  <Heading fontSize="2xl">Confira seus produtos</Heading>
                  <Box bgColor="white" p="8" borderRadius="8" overflow="auto" h="sm">
                    {cart.products.map((product, index) => (
                      <ProductInput key={product.id} product={product} cartIndex={index} />
                    ))}
                  </Box>
                  <Box fontWeight="bold" fontSize="xl" float="right" mt="10">
                    Total:
                    {currency(cart.total)}
                  </Box>
                </Box>
              </Grid>
              <Button
                bgColor="secondaryColor"
                color="white"
                borderRadius="30"
                float="right"
                isLoading={props.isSubmitting}
              >
                Confirmar
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </>
  )
}

export default ConfirmOrder
