/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import { Box, Heading, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import TakeoutPaymentForm from './takeout-payment-form'
import OnlinePaymentForm from './online-payment-form'

const ONLINE_PAYMENT = 'online payment'
const TAKEOUT_PAYMENT = 'takeout payment'

const PaymentForm = (): JSX.Element => {
  const [paymentForm, setPaymentForm] = useState(TAKEOUT_PAYMENT)

  return (
    <>
      <Box>
        <Heading fontSize="2xl">Pagamento na retirada</Heading>
        {/* <Heading fontSize="2xl">Forma de pagamento</Heading> */}
        {/* <Box mt="8" mb="8">
          <RadioGroup onChange={setPaymentForm} value={paymentForm}>
            <Stack direction="column">
              <Radio value={ONLINE_PAYMENT}>Pagamento online</Radio>
              <Radio value={TAKEOUT_PAYMENT}>Pagamento na retirada</Radio>
            </Stack>
          </RadioGroup>
        </Box> */}
        {paymentForm === TAKEOUT_PAYMENT ? <TakeoutPaymentForm /> : <OnlinePaymentForm />}
      </Box>
    </>
  )
}

export default PaymentForm
