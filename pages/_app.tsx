import '../styles/globals.css'
import cookie from 'cookie'
import * as React from 'react'
import type { IncomingMessage } from 'http'
import type { AppProps, AppContext } from 'next/app'
import settings from '../keycloak.json'
import { SSRKeycloakProvider, SSRCookies, useKeycloak } from '@react-keycloak/ssr'
import Layout from '../Components/Layout'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useEffect } from 'react'
import { login } from '../Queries/User'

const keycloakCfg = {
  realm: settings.realm,
  url: settings['auth-server-url'],
  clientId: settings.resource,
}

interface InitialProps {
  cookies: unknown
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  const queryClient = new QueryClient()
  const env = process.env.NODE_ENV
  const { keycloak } = useKeycloak()

  useEffect(() => {
    async () => login(await keycloak?.token)
  })

  let initOptions = {}
  if (env === "production")
    initOptions = {
      onLoad: 'login-required',
      checkLoginIframe: false
    }
  else initOptions = { onLoad: '' }

  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakCfg}
      persistor={SSRCookies(cookies)}
      initOptions={initOptions}
    >
      <QueryClientProvider client={queryClient}>
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