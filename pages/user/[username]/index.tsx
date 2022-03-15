import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Details from './Details'

const Profile: NextPage = () => {
    const router = useRouter()
    const { username } = router.query
    //this should find the corresponding user and check if the token matches
    //if there is a corresponding user but token does not match show just detail
    //if both match show buttons for settings and dashboard
    const fakeUser = {
        name: "horsegirl02",
        profilePic: "/vercel.svg",
        workStatus: ".Net full stack developer",
        bio: "Both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass.",
        funFact: "Likes to sleep"
    }
    
    return (
        <>
            <Details user={fakeUser}/>
        </>
    )
}

export default Profile