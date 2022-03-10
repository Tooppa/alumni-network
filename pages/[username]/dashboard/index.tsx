import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Post from '../../../Components/post/Post'
import Details from '../Details'
import Buttons from './DashBoardButtons'

const Dashboard: NextPage = () => {
    const router = useRouter()
    const { username } = router.query
    //this should find the corresponding user and check if the token matches
    //if there is a corresponding user but token does not match show just detail
    //if both match show buttons for settings and dashboard
    const fakeUser = {
        name: "Sleepper",
        profilePic: "/srctest",
        workStatus: "Sleeping",
        bio: "Feeling tired",
        funFact: "Likes to sleep"
    }
    const fakePost = {
        title: "this is a test",
        text: "this is some random text for the post"
    }
    
    return (
        <>
            <Details user={fakeUser}/>
            <Buttons/>
            <Post data={fakePost}/>
        </>
    )
}

export default Dashboard