import type { NextPage } from 'next'
import { useQuery, useQueryClient } from 'react-query'
import Post from '../../Components/Post'
import CreatePost from './CreatePost'
import { getPosts } from '../../Queries/Post'
import PostList from '../../Components/PostList'

const Timeline: NextPage = () => {
    //testing group fetching
    const queryClient = useQueryClient()
    const { data, status } = useQuery('posts', getPosts)

    const fakeUser = {
        name: "horsegirl02"
    }

    const fakePost = {
        title: "this is a test",
        text: "this is some random text for the post this is some random text for the post this is some random text for the post this is some random text for the post",
        time: "March 11, 2022"
    }

    const fakeComment = {
        text: "Great post bro!"
    }

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