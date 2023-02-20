import React, { createContext } from 'react'
import { DefaultTheme } from 'styled-components'
import light from '../styles/themes/light'
import dark from '../styles/themes/dark'
import usePersistedState from '../utils/usePersistedState'

interface ThemeContextData {
    toggleTheme: () => void
    theme: DefaultTheme
}

export const ThemeContext = createContext<ThemeContextData>(
    {} as ThemeContextData
)

export const ThemeContextProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = usePersistedState('creators-theme', 'dark')

    const toggleTheme = () => {
        setTheme(theme == 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider
            value={{ toggleTheme, theme: theme == 'light' ? light : dark }}
        >
            {children}
        </ThemeContext.Provider>
    )
}
