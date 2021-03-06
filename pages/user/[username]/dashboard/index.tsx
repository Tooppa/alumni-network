import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import CreatePrivateMessage from '../../../../Components/CreatePrivateMessage'
import PostList from '../../../../Components/PostList'
import { getPosts } from '../../../../Queries/Post'
import { getUser, getUserById } from '../../../../Queries/User'
import { PostType, UserType } from '../../../../Types/Data'
import Details from '../Details'

const Dashboard: NextPage = () => {
    const router = useRouter()
    const { username } = router.query
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token
    const { data, status } = useQuery<UserType>('user' + username, () => getUserById(Number(username), token), {enabled: !!token})
    const { data: currentUser, status: currentStatus } = useQuery<UserType>('currentuser', () => getUser(token), {enabled: !!token})
    const { data: posts, status: postStatus } = useQuery<Array<PostType>>('profilePosts', () => getPosts(token), { enabled: !!token })

    if (status === "success" && currentStatus === "success" && !!token) {
        //redirects if its not your dashboard
        if(data.id != currentUser.id) {
            router.push(`/user/${username}`)
            return <></>
        }
        //if there is no corresponding group query prints out a string 
        if (typeof (data) != "object")
            return <>
                <p>{data}</p>
            </>

        return (
            <>
                <Head>
                    <title>Dashboard | Alumni Network</title>
                    <meta name="description" content="Welcome to Alumni Network" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Details user={data} />
                <CreatePrivateMessage currentUser={data}/>
                {postStatus === "success" &&
                    <PostList data={posts.filter(post => post.senderId === currentUser.id) as Array<PostType>} token={token} postList='profilePosts'/>
                }
            </>
        )
    }
    else return <></>
}

export default Dashboard