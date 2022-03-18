
import { useKeycloak } from '@react-keycloak/ssr'
import type { NextPage } from 'next'
import Head from 'next/head'
import { KeycloakInstance } from 'keycloak-js'


const Token: NextPage = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const token: string | undefined = keycloak?.token

  return (
        <>
            <Head>
                <title>Token</title>
                <meta name="description" content="Welcome to Alumni Network" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <p className="p-10 break-words">{token}</p>
        </>
    )
}

export default Token
