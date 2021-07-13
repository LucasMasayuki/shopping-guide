import React from 'react'

// 1. import `ChakraProvider` component and `extendTheme`
import { extendTheme, ChakraProvider, CSSReset, ColorModeOptions } from '@chakra-ui/react'
import theme from './theme'
import colors from './colors'

// 2. declare your configuration, these are the defaults
const config: ColorModeOptions = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

// 3. extend the theme
const customTheme = extendTheme({ colors, theme, config })

// eslint-disable-next-line react/prop-types
const ThemeContainer: React.FC = ({ children }) => (
  <ChakraProvider theme={customTheme}>
    <CSSReset />
    {children}
  </ChakraProvider>
)

export default ThemeContainer
