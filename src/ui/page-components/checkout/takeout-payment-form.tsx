import React from 'react'

import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import { Field, FieldProps, Form } from 'formik'

const TakeoutPaymentForm = (): JSX.Element => {
  const takeoutPaymentList = ['dinheiro', 'cartão de crédito', 'cartão de débito', 'cheque']

  return (
    <>
      <Form>
        <Field name="takeoutPayment">
          {({ field, form }: FieldProps) => (
            <FormControl isInvalid={form.errors.fullName !== undefined} isRequired>
              <FormLabel htmlFor="takeoutPayment">Método de pagamento</FormLabel>
              <Select {...field} id="takeoutPayment" placeholder="Selecione um método">
                {takeoutPaymentList.map((takeoutPayment) => (
                  <option key={takeoutPayment} value={takeoutPayment}>
                    {takeoutPayment}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}
        </Field>
      </Form>
    </>
  )
}

export default TakeoutPaymentForm
