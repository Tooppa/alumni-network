import type { NextPage } from 'next'
import { useQuery, useQueryClient } from 'react-query'
import Post from '../../Components/Post'
import CreatePost from './CreatePost'
import { getPosts } from '../../Queries/Post'
import PostList from '../../Components/PostList'

const Timeline: NextPage = () => {
    const queryClient = useQueryClient()
    const { data, status } = useQuery('posts', getPosts)

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