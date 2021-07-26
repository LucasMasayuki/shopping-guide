/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik'
import validator from 'validator'

import { Button, FormControl, FormErrorMessage, FormLabel, Grid, Input, Heading, useToast } from '@chakra-ui/react'
import { cpfMask, isValidCpf } from '@/src/utils/utiltiies-functions'
import makeRemoteSignup from '@/src/main/usecases/remote-signup-factory'
import { useSigninSignupState } from '../../contexts-providers/store/signin-signup-provider'
import { useAuthState } from '../../contexts-providers/store/auth-provider'
import AppButton from '../shared/app-button'

type SignupForm = { email: string; birthdate: string; name: string; document: string; interests: string }

const Signup = (): JSX.Element => {
  const { auth, setAuth } = useAuthState()
  const { setIsSigninScreen } = useSigninSignupState()
  const [cpf, setCpf] = useState('')
  const toast = useToast()

  const validateEmail = (email: string): string => {
    let error = ''

    if (!validator.isEmail(email)) {
      error = 'Insira um email válido'
    }

    return error
  }

  const validateName = (name: string): string => {
    let error = ''

    if (validator.isEmpty(name)) {
      error = 'Insira um nome'
    }

    return error
  }

  const validateDocument = (document: string): string => {
    let error = ''

    if (!isValidCpf(cpf)) {
      error = 'Insira um cpf válido'
    }

    return error
  }

  const validateBirthdate = (birthdate: string): string => {
    let error = ''

    if (validator.isEmpty(birthdate)) {
      error = 'Insira uma data de aniversário'
    }

    return error
  }

  const onSubmit = async (values: SignupForm, actions: FormikHelpers<SignupForm>): Promise<void> => {
    console.log(values)
    let aboutUser
    try {
      aboutUser = await makeRemoteSignup().register(values)
    } catch (e) {
      toast({
        title: `${e}`,
        status: 'error',
        isClosable: true,
      })
      actions.setSubmitting(false)
      return
    }

    if (aboutUser) {
      console.log('Usuario logado')
      console.log(aboutUser)

      setAuth(aboutUser)
      console.log(auth)
    } else {
      toast({
        title: 'Algo deu errado, por favor tente novamente',
        status: 'error',
        isClosable: true,
      })
    }

    actions.setSubmitting(false)
  }

  return (
    <>
      <Formik
        initialValues={{ email: '', name: '', document: '', birthdate: '', interests: '' }}
        onSubmit={(values, actions) => onSubmit(values, actions)}
      >
        {(props) => (
          <Form>
            <Heading fontSize="2xl">Cadastro</Heading>
            <Grid gridTemplateColumns="auto auto" gap="3" mt="10" mb="4">
              <Field name="name" validate={validateName}>
                {({ field, form }: FieldProps) => (
                  <FormControl isInvalid={form.errors.name !== ''} isRequired>
                    <FormLabel htmlFor="name">Nome</FormLabel>
                    <Input {...field} id="name" placeholder="name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="document" validate={validateDocument}>
                {({ field, form }: FieldProps) => (
                  <FormControl isInvalid={form.errors.document !== ''} isRequired>
                    <FormLabel htmlFor="document">CPF</FormLabel>
                    <Input
                      {...field}
                      id="document"
                      placeholder="xxx.xxx.xxx-xx"
                      value={cpf}
                      onChange={(event) => setCpf(cpfMask(event.target.value))}
                    />
                    <FormErrorMessage>{form.errors.document}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email" validate={validateEmail}>
                {({ field, form }: FieldProps) => (
                  <FormControl isInvalid={form.errors.email !== ''} isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} id="email" placeholder="email@gmail.com" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="birthdate" validate={validateBirthdate}>
                {({ field, form }: FieldProps) => (
                  <FormControl isInvalid={form.errors.birthdate !== ''} isRequired>
                    <FormLabel htmlFor="birthdate">Aniversário</FormLabel>
                    <Input {...field} id="birthdate" placeholder="xx/xx/xxxx" type="date" />
                    <FormErrorMessage>{form.errors.birthdate}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="interests">
                {({ field }: FieldProps) => (
                  <FormControl>
                    <FormLabel htmlFor="interests">Interesses</FormLabel>
                    <Input {...field} id="interests" placeholder="Interesse, Interesse" />
                  </FormControl>
                )}
              </Field>
            </Grid>
            <Grid gridTemplateColumns="auto auto" gap="2" justifyItems="center" alignItems="center">
              <Button
                mt={6}
                w="100%"
                bgColor="white"
                border="1px solid lightgray"
                color="black"
                onClick={() => setIsSigninScreen(true)}
                borderRadius="30"
              >
                Voltar
              </Button>
              <AppButton
                mt={4}
                w="100%"
                _hover={{ bgColor: 'secondaryColor' }}
                isLoading={props.isSubmitting}
                type="submit"
              >
                Entrar
              </AppButton>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Signup
