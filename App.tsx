import React from 'react'
import { ThemeProvider } from './src/core/theme/ThemeContext'
import AppNavigator from './src/app/navigation/AppNavigator'
import RootLayout from './src/app/_layout'

const App = () => {
  return (
    <ThemeProvider>
      <AppNavigator/>
      {/* <RootLayout/> */}
    </ThemeProvider>
  )
}

export default App