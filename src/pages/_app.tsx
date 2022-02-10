import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Provider as ReduxProvider } from 'react-redux'
import { Header } from '../components/Header'
import { store } from '../store/store'

import "../../styles/global.scss"
import { AppContextProvider } from '../context/AppProvider'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>
      <AppContextProvider>
        <Header />
        <Component {...pageProps} />
      </AppContextProvider>
      </ReduxProvider>
    </SessionProvider>
  )
}

export default MyApp
