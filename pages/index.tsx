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

  const welcomeMessage =
    keycloak?.authenticated
      ? "you are logged in"
      : "Welcome visitor. Please login to continue.";
  return (
    <div className="">
      
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Welcome to Alumni Network" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="border border-solid border-gray-900 p-3 flex flex-col justify-center text-center mt-40">
        <p>
          {welcomeMessage}
        </p>
        <button className='border border-solid border-gray-900 p-3 mt-2 bg-green-300' onClick={() => keycloak?.logout()}>Logout</button>
      </main>
    </div>
  )
}

export default Home
