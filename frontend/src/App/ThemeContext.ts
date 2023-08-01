import React from 'react'
import Theme from './types/Theme'

const ThemeContext = React.createContext<Theme>('white')

export default ThemeContext