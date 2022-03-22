import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import Post from '../../../../Components/Post'
import { getUserById } from '../../../../Queries/User'
import { UserType } from '../../../../Types/Data'
import Details from '../Details'
import Buttons from './DashBoardButtons'

const Dashboard: NextPage = () => {
    const router = useRouter()
    const { username } = router.query
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token
    const { data, status } = useQuery<UserType>('user', () => getUserById(Number(username), token), {enabled: !!token})

    if (status === "success") {
        //if there is no corresponding group query prints out a string 
        if (typeof (data) != "object")
            return <>
                <p>{data}</p>
            </>
        return <>
            <Details user={data}/>
            <Buttons />
        </>

    }
    else return <></>
}

export default Dashboard