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
import { useState } from 'react'

const Timeline: NextPage = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const token: string | undefined = keycloak?.token
  const { data, status } = useQuery<Array<PostType>>('frontpagePosts', () => getPosts(token), { enabled: !!token })
  const { data: user, status: userStatus } = useQuery<UserType>('currentuser', () => getUser(token), { enabled: !!token })
  const [filter, setFilter] = useState({
    all: true,
    groups: false,
    topics: false,
    own: false
  })

  const handleFilter = (all: boolean, groups: boolean, topics: boolean, own: boolean) => {
    setFilter({
      all: all,
      groups: groups,
      topics: topics,
      own: own
    })
  }

  const filterData = (posts: Array<PostType>) => {
    let newPosts: Array<PostType> = []
    if (userStatus === "success") {
      if (filter.all) return posts
      if (filter.groups) newPosts = newPosts.concat(posts.filter((post) => { }))
      if (filter.topics) newPosts = newPosts.concat(posts.filter((post) => { }))
      if (filter.own) newPosts = newPosts.concat(posts.filter((post) => post.senderId === user.id))
    }
    return newPosts as Array<PostType>
  }

  if (status === 'success')
    return (
      <>
        <Head>
          <title>Index | Alumni Network</title>
          <meta name="description" content="Welcome to Alumni Network" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Previews />
        {/* TODO: Get the current topicId, groupId, parentId or userId and insert it here */}
        <CreatePost topicId={4} />
        <Filter filter={handleFilter} />
        <PostList data={filterData(data) as Array<PostType>} />
      </>
    )
  else {
    return (
      <>
        <Previews />
        {/* TODO: Get the current topicId, groupId, parentId or userId and insert it here */}
        <CreatePost topicId={4} />
      </>
    );
  }
}

export default Timeline