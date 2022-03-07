import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Settings: NextPage = () => {
    const router = useRouter()
    const { username } = router.query
    return (
        <>
            <h1 className="text-3xl font-bold underline">settings page {username}</h1>
        </>
    )
}

export default Settings