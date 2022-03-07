import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Profile: NextPage = () => {
    const router = useRouter()
    const { username } = router.query
    console.log(username);
    
    return (
        <>
            <h1 className="text-3xl font-bold underline">profile page {username}</h1>
        </>
    )
}

export default Profile