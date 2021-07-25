import React from 'react'

import { FormControl, FormErrorMessage, FormLabel, Grid, Input } from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'
import validator from 'validator'

const OnlinePaymentForm = (): JSX.Element => {
  const validateFullName = (fullName: string): string => {
    let error = ''

    if (validator.isEmpty(fullName)) {
      error = 'Insira um email válido'
    }

    return error
  }

  const validateNumber = (number: string): string => {
    let error = ''

    if (validator.isCreditCard(number)) {
      error = 'Insira um email válido'
    }

    return error
  }

  const validateCvv = (cvv: string): string => {
    let error = ''

    if (validator.isEmpty(cvv)) {
      error = 'Insira um email válido'
    }

    return error
  }

  const validateExpireDate = (expireDate: string): string => {
    let error = ''

    if (validator.isEmpty(expireDate)) {
      error = 'Insira um email válido'
    }

    return error
  }

  return (
    <>
      <Grid gridTemplateColumns="auto auto" gap="3" mt="10">
        <Field name="fullName" validate={validateFullName}>
          {({ field, form }: FieldProps) => (
            <FormControl isInvalid={form.errors.fullName !== undefined} isRequired>
              <FormLabel htmlFor="fullName">Nome</FormLabel>
              <Input {...field} id="name" placeholder="name" />
              <FormErrorMessage>{form.errors.fullName}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name="number" validate={validateNumber}>
          {({ field, form }: FieldProps) => (
            <FormControl isInvalid={form.errors.number !== undefined} isRequired>
              <FormLabel htmlFor="number">Número</FormLabel>
              <Input {...field} id="number" />
              <FormErrorMessage>{form.errors.number}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name="cvv" validate={validateCvv}>
          {({ field, form }: FieldProps) => (
            <FormControl isInvalid={form.errors.cvv !== undefined} isRequired>
              <FormLabel htmlFor="cvv">CVV</FormLabel>
              <Input {...field} id="cvv" placeholder="***" />
              <FormErrorMessage>{form.errors.cvv}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name="expireDate" validate={validateExpireDate}>
          {({ field, form }: FieldProps) => (
            <FormControl isInvalid={form.errors.expireDate !== undefined} isRequired>
              <FormLabel htmlFor="expireDate">Data de expiração</FormLabel>
              <Input {...field} id="expireDate" placeholder="xx/xx" type="date" />
              <FormErrorMessage>{form.errors.expireDate}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Grid>
    </>
  )
}

export default OnlinePaymentForm
