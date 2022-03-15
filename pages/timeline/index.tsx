import type { NextPage } from 'next'
import { useQuery, useQueryClient } from 'react-query'
import Post from '../../Components/Post'
import CreatePost from './CreatePost'
import { getPosts } from '../../Queries/Post'
import PostList from '../../Components/PostList'
import { useKeycloak } from '@react-keycloak/ssr'

const Timeline: NextPage = () => {
    const queryClient = useQueryClient()
    const { keycloak } = useKeycloak()
    const token: string | undefined = keycloak?.token
    const { data, status } = useQuery('posts', () => getPosts(token), {enabled: !!token})

    if (status === 'success')
        return (
            <>
                <CreatePost />
                <PostList data={data} />
            </>
        )
    else {
        return (
            <>
                <CreatePost />
            </>
        )
    }
}

export default Timeline