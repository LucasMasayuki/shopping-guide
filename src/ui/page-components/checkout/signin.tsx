/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Formik, Form, Field, FieldProps } from 'formik'
import validator from 'validator'

import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react'
import { useSigninSignupState } from '../../contexts-providers/store/signin-signup-provider'

const Signin = (): JSX.Element => {
  const { setIsSigninScreen } = useSigninSignupState()

  const validateEmail = (email: string): string => {
    let error = ''

    if (validator.isEmail(email)) {
      error = 'Insira um email válido'
    }

    return error
  }

  return (
    <>
      <Text fontWeight="bold" fontSize="xl" mb="5">
        Falta muito pouco para concluir sua compra
      </Text>
      <Text fontSize="md" mb="5">
        Coloque seu email de cadastro da loja
      </Text>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)
        }}
      >
        {(props) => (
          <Form>
            <Box mt="30" mb="30">
              <Field name="email" validate={validateEmail}>
                {({ field, form }: FieldProps) => (
                  <FormControl isInvalid={form.errors.enail !== undefined && form.touched.enail !== undefined}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} id="email" placeholder="email@gmail.com" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Button
              mb={5}
              color="white"
              bgColor="secondaryColor"
              isLoading={props.isSubmitting}
              type="submit"
              borderRadius="30"
            >
              Entrar
            </Button>
            <Text fontSize="sm" textAlign="center">
              Não possui cadastro ?
            </Text>
            <Text fontSize="sm" textAlign="center">
              <Text
                ml="1"
                d="inline-block"
                fontWeight="bold"
                color="blue"
                cursor="pointer"
                onClick={() => setIsSigninScreen(false)}
              >
                Clique aqui
              </Text>{' '}
              para se cadastrar em nossa loja
            </Text>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Signin
