import { useKeycloak } from '@react-keycloak/ssr'
import type { NextPage } from 'next'
import Head from 'next/head'
import { KeycloakInstance } from 'keycloak-js'


const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Welcome to Alumni Network" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

export default Home
