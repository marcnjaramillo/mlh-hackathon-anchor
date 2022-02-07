import '../styles/globals.css'
import '../styles/Home.css'
import '../styles/UserGrid.css'
import '../styles/UserCard.css'
import type { AppProps } from 'next/app'
import WalletAdapter from '../components/WalletAdapter'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletAdapter>
      <Component {...pageProps} />
    </WalletAdapter>
  )
}

export default MyApp
