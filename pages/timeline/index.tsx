import type { NextPage } from 'next'
import Post from '../../Components/post/Post'
import CreatePost from './CreatePost'

const Timeline: NextPage = () => {

    const fakePost = {
        title: "this is a test",
        text: "this is some random text for the post this is some random text for the post this is some random text for the post this is some random text for the post"
    }

    return (
        <>
            <CreatePost />
            <Post data={fakePost} />
        </>
    )
}

export default Timeline