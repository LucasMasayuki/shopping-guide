/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'

import { Box, Grid, Heading, useToast } from '@chakra-ui/react'
import makeLocalGetCart from '@/src/main/usecases/local-get-cart-factory'
import { Cart } from '@/src/domain/models/cart-model'
import { currency } from '@/src/utils/utiltiies-functions'
import { Form, Formik, FormikHelpers } from 'formik'
import makeRemotePurchase from '@/src/main/usecases/remote-purchase-factory'
import { useRouter } from 'next/router'
import makeRemoteGetCart from '@/src/main/usecases/remote-get-cart'
import { useCartState } from '../../contexts-providers/store/cart-provider'
import ProductInput from '../shared/product-input'
import PaymentForm from './payment-form'
import AppButton from '../shared/app-button'
import { useAuthState } from '../../contexts-providers/store/auth-provider'

export type PaymentFormFields = {
  expireDate: string
  number: string
  fullName: string
  cvv: string
  takeoutPayment: string
}

const ConfirmOrder = (): JSX.Element => {
  const { cart, setCart } = useCartState()
  const { auth } = useAuthState()

  const router = useRouter()
  const toast = useToast()
  let { name } = router.query

  useEffect(() => {
    if (Array.isArray(name)) {
      // eslint-disable-next-line prefer-destructuring
      name = name[0]
    }

    makeLocalGetCart()
      .getCart(name ?? '')
      .then((localCart: Cart) => {
        if (localCart.about !== '') {
          makeRemoteGetCart()
            .getCart(localCart.about)
            .then((remoteCart) => {
              setCart(remoteCart)
            })
        } else {
          setCart(localCart)
        }
      })
  }, [setCart])

  const onSubmit = async (values: PaymentFormFields, actions: FormikHelpers<PaymentFormFields>): Promise<void> => {
    const purchaseParams = {
      aboutUser: auth,
      cart,
      creditcard: {
        cvv: values.cvv ?? '',
        number: values.number ?? '',
        name: values.fullName ?? '',
        expireDate: values.expireDate ?? '',
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
    localStorage.clear()
    router.push({ pathname: 'checkout-done', query: { name } })
  }

  return (
    <>
      <Box backgroundColor="white" borderRadius="10" padding="10" w="100%" mt="72px">
        <Formik
          initialValues={{ fullName: '', number: '', cvv: '', expireDate: '', takeoutPayment: '' }}
          onSubmit={(values, actions) => onSubmit(values, actions)}
        >
          {(props) => (
            <Form>
              <Grid gridTemplateColumns="45% 5% auto" gap="10" mb="5">
                <PaymentForm />
                <Box w="0.5" h="400" border="1px solid lightgray" borderStyle="dotted" />
                <Box>
                  <Heading fontSize="2xl">Confira seus produtos</Heading>
                  <Box bgColor="white" p="8" borderRadius="8" overflow="auto" h="330">
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
              <AppButton
                _hover={{ bgColor: 'secondaryColor' }}
                float="right"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Confirmar
              </AppButton>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  )
}

export default ConfirmOrder
