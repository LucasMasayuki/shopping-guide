import ThemeContainer from '@/src/ui/theme/theme-container'
import { AppProps } from 'next/app'
import React from 'react'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeContainer>
      <Component {...pageProps} />
    </ThemeContainer>
  )
}
