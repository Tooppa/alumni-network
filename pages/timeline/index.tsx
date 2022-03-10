import type { NextPage } from 'next'
import Post from '../../Components/Post'
import CreatePost from './CreatePost'

const Timeline: NextPage = () => {

    const fakeUser = {
        name: "horsegirl02"
    }

    const fakePost = {
        title: "this is a test",
        text: "this is some random text for the post this is some random text for the post this is some random text for the post this is some random text for the post"
    }

    const fakeComment = {
        text: "Great post bro!"
    }

    return (
        <>
            <CreatePost />
            <Post user={fakeUser} post={fakePost} comment={fakeComment}/>
        </>
    )
}

export default Timeline