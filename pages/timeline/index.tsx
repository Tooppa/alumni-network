import type { NextPage } from 'next'
import { useQuery, useQueryClient } from 'react-query'
import Post from '../../Components/Post'
import CreatePost from './CreatePost'
import { getPosts } from '../../Queries/Post'
import PostList from '../../Components/PostList'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import Previews from './Previews'
import { PostType } from '../../Types/Data'

const Timeline: NextPage = () => {
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token
    const { data, status } = useQuery<Array<PostType>>('posts', () => getPosts(token), {enabled: !!token})

    if (status === 'success')
        return (
            <>
                <Previews />
                <CreatePost />
                <PostList data={data} />
            </>
        )
    else {
        return (
            <>
                <Previews />
                <CreatePost />
            </>
        )
    }
}

export default Timeline