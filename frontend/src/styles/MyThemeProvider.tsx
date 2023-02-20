import { ThemeProvider } from 'styled-components'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

const MyThemeProvider: React.FC = ({ children }) => {
    const { theme } = useContext(ThemeContext)

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MyThemeProvider
