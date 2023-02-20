import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string

    colors: {
      background: string
      text: string
      textPrimary: string
      primary: string
      gray1: string
      gray2: string
      gray3: string
      gray4: string
      green: string
      error: string
      warn: string
    }
  }
}
