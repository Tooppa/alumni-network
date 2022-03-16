import '../styles/globals.css'
import cookie from 'cookie'
import * as React from 'react'
import type { IncomingMessage } from 'http'
import type { AppProps, AppContext } from 'next/app'
import settings from '../keycloak.json'
import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak/ssr'
import Layout from '../Components/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import LoginManager from '../Components/LoginManager'

interface InitialProps {
  cookies: unknown
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  const queryClient = new QueryClient()
  const env = process.env.NODE_ENV

  let initOptions = {
      onLoad: 'login-required',
      checkLoginIframe: false
    }

  let keycloakCfg = {
    realm: settings.realm,
    url: settings['auth-server-url'],
    clientId: settings.resource,
  }

  if (env != "production"){
    keycloakCfg.clientId += "-localhost"
  }
  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakCfg}
      persistor={SSRCookies(cookies)}
      initOptions={initOptions}
    >
      <QueryClientProvider client={queryClient}>
        <LoginManager />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SSRKeycloakProvider>
  )
}

function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {}
  }
  return cookie.parse(req.headers.cookie || '')
}

MyApp.getInitialProps = async (context: AppContext) => {
  // Extract cookies from AppContext
  return {
    cookies: parseCookies(context?.ctx?.req)
  }
}

export default MyApp