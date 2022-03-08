import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Details from './detail'

const Profile: NextPage = () => {
    const router = useRouter()
    const { username } = router.query
    const fakeUser = {
        name: "Test"
    }
    
    return (
        <>
            <Details user={fakeUser}/>
        </>
    )
}

export default Profile