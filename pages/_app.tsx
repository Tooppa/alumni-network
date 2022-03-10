import '../styles/globals.css'
import 'flowbite'
import type { AppProps } from 'next/app'
import Layout from '../Components/layout/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
