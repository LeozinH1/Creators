import { AuthProvider } from '../contexts/AuthContext'
import { AppProps } from 'next/app'
import { ThemeContextProvider } from '../contexts/ThemeContext'
import GlobalStytle from '../styles/global'
import MyThemeProvider from '../styles/MyThemeProvider'
import { ToastContainer } from 'react-toastify'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Router from 'next/router'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ThemeContextProvider>
        <MyThemeProvider>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className="toast-container"
            toastClassName="dark-toast"
          />
          <GlobalStytle />
        </MyThemeProvider>
      </ThemeContextProvider>
    </AuthProvider>
  )
}

export default MyApp
