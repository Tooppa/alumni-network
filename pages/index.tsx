import type { NextPage } from 'next'
import Head from 'next/head'
import CreatePost from '../Components/CreatePost'
import { getPosts } from '../Queries/Post'
import PostList from '../Components/PostList'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import Previews from './Previews'
import { PostType, UserType } from '../Types/Data'
import Filter from './Filter'
import { getUser } from '../Queries/User'
import { useState } from 'react'
import { useQuery } from 'react-query'

const Timeline: NextPage = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const token: string | undefined = keycloak?.token
  const { data, status } = useQuery<Array<PostType>>('frontpagePosts', () => getPosts(token), { enabled: !!token })
  const { data: user, status: userStatus } = useQuery<UserType>('currentuser', () => getUser(token), { enabled: !!token })
  const [filter, setFilter] = useState({
    all: true,
    groups: false,
    topics: false,
    own: false,
    replies: false
  })

  //this function is called from the filter component and it sets the current filter settings
  const handleFilter = (all: boolean, groups: boolean, topics: boolean, own: boolean, replies: boolean) => {
    setFilter({
      all: all,
      groups: groups,
      topics: topics,
      own: own,
      replies: replies
    })
  }

  //handles the filter that has been sent from the filter component
  //it creates an empty array and concats a filtered part of the fetched array for everytime it has a match
  const filterData = (posts: Array<PostType>) => {
    let newPosts: Array<PostType> = []
    if (userStatus === "success") {
      if (filter.all) return posts
      if (filter.groups) newPosts = newPosts.concat(posts.filter((post) => post.groupName != null))
      if (filter.topics) newPosts = newPosts.concat(posts.filter((post) => post.topicName != null))
      if (filter.replies) newPosts = newPosts.concat(posts.filter((post) => post.replies.length > 0))
      if (filter.own) newPosts = newPosts.concat(posts.filter((post) => post.senderId === user.id))
    }
    return newPosts as Array<PostType>
  }

  if (status === 'success' && !!token)
    return (
      <>
        <Head>
          <title>Index | Alumni Network</title>
          <meta name="description" content="Welcome to Alumni Network" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Previews />
        {/* TODO: Get the current topicId, groupId, parentId or userId and insert it here */}
        <CreatePost topicId={4} token={token} postList="frontpagePosts"/>
        <Filter filter={handleFilter} />
        <PostList data={filterData(data) as Array<PostType>} token={token} postList='frontpagePosts'/>
      </>
    )
  else {
    return (
      <>
        <Previews />
      </>
    );
  }
}

export default Timeline