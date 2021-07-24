/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik'
import validator from 'validator'

import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text, useToast } from '@chakra-ui/react'
import makeRemoteSignin from '@/src/main/usecases/remote-signin-factory'
import { useSigninSignupState } from '../../contexts-providers/store/signin-signup-provider'
import { useAuthState } from '../../contexts-providers/store/auth-provider'

type SigninForm = { email: string }

const Signin = (): JSX.Element => {
  const { setAuth } = useAuthState()
  const { setIsSigninScreen } = useSigninSignupState()
  const toast = useToast()

  const validateEmail = (email: string): string => {
    let error = ''

    if (validator.isEmail(email)) {
      error = 'Insira um email válido'
    }

    return error
  }

  const onSubmit = async (values: SigninForm, actions: FormikHelpers<SigninForm>): Promise<void> => {
    let user = null
    try {
      user = await makeRemoteSignin().login(values.email)
    } catch (e) {
      toast({
        title: `${e}`,
        status: 'error',
        isClosable: true,
      })
      actions.setSubmitting(false)
      return
    }

    setAuth(user)
    actions.setSubmitting(false)
  }

  return (
    <>
      <Text fontWeight="bold" fontSize="xl" mb="5">
        Falta muito pouco para concluir sua compra
      </Text>
      <Text fontSize="md" mb="5">
        Coloque seu email de cadastro da loja
      </Text>
      <Formik initialValues={{ email: '' }} onSubmit={(values, action) => onSubmit(values, action)}>
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
