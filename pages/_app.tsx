import '../styles/globals.css'
import cookie from 'cookie'
import * as React from 'react'
import type { IncomingMessage } from 'http'
import type { AppProps, AppContext } from 'next/app'
import settings from '../keycloak.json'
import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak/ssr'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import LoginManager from '../Components/LoginManager'
import Layout from '../Components/Layout/Layout'

interface InitialProps {
  cookies: unknown
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  const queryClient = new QueryClient()
  const env = process.env.NODE_ENV

  //options for the keycloak this onload set the forced redirect when opening the site
  let initOptions = {
    onLoad: 'login-required',
    checkLoginIframe: false
  }

  //this gets the correct settings for the keycloak from the keycloak file
  let keycloakCfg = {
    realm: settings.realm,
    url: settings['auth-server-url'],
    clientId: settings.resource,
  }

  //sets the correct client id depending if its production
  if (env != "production") {
    keycloakCfg.clientId += "-localhost"
  }
  //the root app is wrapped with keycloak so the app has acces to the keycloak token everywhere
  //login manager handles login when first opening the app
  //queryclientprovider wraps the app that it has acces to the same query client everywhere
  //layout adds styling to all the pages
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