import React from 'react'

import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

const TakeoutPaymentForm = (): JSX.Element => {
  const takeoutPaymentList = ['dinheiro', 'cartão de crédito', 'cartão de débito', 'cheque']

  return (
    <>
      <Field name="takeoutPayment">
        {({ field, form }: FieldProps) => (
          <FormControl isInvalid={form.errors.takeoutPayment !== undefined} isRequired>
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
    </>
  )
}

export default TakeoutPaymentForm
