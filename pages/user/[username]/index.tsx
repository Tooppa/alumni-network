import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getUser, getUserById } from '../../../Queries/User'
import { UserType } from '../../../Types/Data'
import Details from './Details'

const Profile: NextPage = () => {
    const router = useRouter()
    const { username } = router.query
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token
    const { data, status } = useQuery<UserType>('user' + username, () => getUserById(Number(username), token), {enabled: !!token})
    const { data: currentUser, status: currentStatus } = useQuery<UserType>('currentuser', () => getUser(token), {enabled: !!token})

    if (status === "success" && currentStatus === "success") {
        if(data.id === currentUser.id) {
            router.push(`/user/${username}/dashboard`)
            return <></>
        }
        //if there is no corresponding group query prints out a string 
        if (typeof (data) != "object")
            return <>
                <p>{data}</p>
            </>
        return (
            <>
                <Details user={data} />
            </>
        )
    }
    else return <></>
}

export default Profile