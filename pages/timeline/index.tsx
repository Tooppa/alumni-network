import type { NextPage } from 'next'
import { useQuery, useQueryClient } from 'react-query'
import Post from '../../Components/Post'
import CreatePost from './CreatePost'
import { getGroups } from '../../Queries/Group'

const Timeline: NextPage = () => {
    //testing group fetching
    const queryClient = useQueryClient()
    const { data, status } = useQuery('group', getGroups)
    if (status === 'success')
        console.log(data);

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

    return (
        <>
            <CreatePost />
            <Post user={fakeUser} post={fakePost} comment={fakeComment} />
        </>
    )
}

export default Timeline