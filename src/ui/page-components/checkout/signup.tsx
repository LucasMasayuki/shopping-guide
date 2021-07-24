import React from 'react'
import { Formik, Form, Field, FieldProps } from 'formik'
import validator from 'validator'

import { Button, FormControl, FormErrorMessage, FormLabel, Grid, Input, Heading } from '@chakra-ui/react'
import { isValidCpf } from '@/src/utils/utiltiies-functions'
import { useSigninSignupState } from '../../contexts-providers/store/signin-signup-provider'

const Signup = (): JSX.Element => {
  const { setIsSigninScreen } = useSigninSignupState()

  const validateEmail = (email: string): string => {
    let error = ''

    if (validator.isEmail(email)) {
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

    if (isValidCpf(document)) {
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

  return (
    <>
      <Formik
        initialValues={{ email: '', name: '', document: '', birthdate: '' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)
        }}
      >
        {(props) => (
          <Form>
            <Heading fontSize="2xl">Cadastro</Heading>
            <Grid gridTemplateColumns="auto auto" gap="3" mt="10">
              <Field name="name" validate={validateName}>
                {({ field, form }: FieldProps) => (
                  <FormControl isInvalid={form.errors.name !== undefined} isRequired>
                    <FormLabel htmlFor="name">Nome</FormLabel>
                    <Input {...field} id="name" placeholder="name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="document" validate={validateDocument}>
                {({ field, form }: FieldProps) => (
                  <FormControl isInvalid={form.errors.document !== undefined} isRequired>
                    <FormLabel htmlFor="document">CPF</FormLabel>
                    <Input {...field} id="document" placeholder="xxx.xxx.xxx-xx" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email" validate={validateEmail}>
                {({ field, form }: FieldProps) => (
                  <FormControl isInvalid={form.errors.email !== undefined} isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} id="email" placeholder="email@gmail.com" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="birthdate" validate={validateBirthdate}>
                {({ field, form }: FieldProps) => (
                  <FormControl isInvalid={form.errors.birthdate !== undefined} isRequired>
                    <FormLabel htmlFor="birthdate">Aniversário</FormLabel>
                    <Input {...field} id="birthdate" placeholder="xx/xx/xxxx" />
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
            <Button mt={6} bgColor="white" color="black" onClick={() => setIsSigninScreen(true)} borderRadius="30">
              Voltar
            </Button>
            <Button
              mt={4}
              bgColor="secondaryColor"
              color="white"
              isLoading={props.isSubmitting}
              type="submit"
              borderRadius="30"
            >
              Entrar
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Signup
