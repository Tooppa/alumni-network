import type { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from 'react-query'
import CreatePost from './CreatePost'
import { getPosts } from '../Queries/Post'
import PostList from '../Components/PostList'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import Previews from './Previews'
import { PostType } from '../Types/Data'

const Timeline: NextPage = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const token: string | undefined = keycloak?.token
  const { data, status } = useQuery<Array<PostType>>('posts', () => getPosts(token), { enabled: !!token })

  if (status === 'success')
    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Welcome to Alumni Network" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Previews />
        {/* TODO: Get the current topicId, groupId, parentId or userId and insert it here */}
        <CreatePost topicId={1} />
        <PostList data={data as Array<PostType>} />
      </>
    )
  else {
    return (
      <>
        <Previews />
        {/* TODO: Get the current topicId, groupId, parentId or userId and insert it here */}
        <CreatePost topicId={1} />
      </>
    );
  }
}

export default Timeline