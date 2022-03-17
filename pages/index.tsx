import { useKeycloak } from '@react-keycloak/ssr'
import type { NextPage } from 'next'
import Head from 'next/head'
import CreatePost from './timeline/CreatePost'
import { ParsedToken } from '../Types/Token'
import { KeycloakInstance } from 'keycloak-js'


const Home: NextPage = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const token: string | undefined = keycloak?.token
  console.log(token);

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
