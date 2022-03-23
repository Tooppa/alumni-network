import type { NextPage } from 'next'
import Head from 'next/head'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import CreatePost from './CreatePost'
import { getPosts, sendPost } from '../Queries/Post'
import PostList from '../Components/PostList'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import Previews from './Previews'
import { PostType, UserType } from '../Types/Data'
import Filter from './Filter'
import { getUser } from '../Queries/User'

const Timeline: NextPage = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const token: string | undefined = keycloak?.token
  const { data, status } = useQuery<Array<PostType>>('frontpagePosts', () => getPosts(token), { enabled: !!token })
  const { data: user, status: userStatus } = useQuery<UserType>('currentuser', () => getUser(token), { enabled: !!token })
  
  const handleFilter = ( all: boolean, groups: boolean, topics: boolean, own: boolean) => {
    if (status === "success" && userStatus === "success") {
      if (all) return
      else if (groups) data.filter((post) => { })
      else if (topics) data.filter((post) => { })
      else if (own) data.filter((post) => {post.senderId === user.id})
    }
  }

  if (status === 'success')
    return (
      <>
        <Head>
          <title>Alumni Network</title>
          <meta name="description" content="Welcome to Alumni Network" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Previews />
        {/* TODO: Get the current topicId, groupId, parentId or userId and insert it here */}
        <CreatePost topicId={1} />
        <Filter filter={handleFilter}/>
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