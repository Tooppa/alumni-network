import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Details from './detail'

const Profile: NextPage = () => {
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
    
    return (
        <>
            <Details user={fakeUser}/>
        </>
    )
}

export default Profile