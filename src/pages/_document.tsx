import Document, { Html, Head, Main, NextScript } from 'next/document'

import React from 'react'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en" style={{ height: '100%' }}>
        <Head />
        <body style={{ height: '100%' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
