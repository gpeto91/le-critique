import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Header } from '../components/Header'

import "../../styles/global.scss"
import { AppContextProvider } from '../context/AppProvider'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <Header />
        <Component {...pageProps} />
      </AppContextProvider>
    </SessionProvider>
  )
}

export default MyApp
