import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import SettingsForm from './Form'

const Settings: NextPage = () => {
    const router = useRouter()
    const { username } = router.query
    return (
        <>
            <SettingsForm/>
        </>
    )
}

export default Settings