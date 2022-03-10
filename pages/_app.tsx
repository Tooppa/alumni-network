import '../styles/globals.css'
import Layout from '../Components/layout/Layout'
import cookie from 'cookie'
import * as React from 'react'
import type { IncomingMessage } from 'http'
import type { AppProps, AppContext } from 'next/app'
import settings from '../keycloak.json'
import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak/ssr'

const keycloakCfg = {
  realm: settings.realm,
  url: settings['auth-server-url'],
  clientId: settings.resource,
}

interface InitialProps {
  cookies: unknown
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  
  const initOptions = {
    /*
    onLoad: 'login-required',
    checkLoginIframe: false
    */
  }
  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakCfg}
      persistor={SSRCookies(cookies)}
      initOptions={initOptions}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
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