import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Post from '../../../../Components/Post'
import Details from '../Details'
import Buttons from './DashBoardButtons'

const Dashboard: NextPage = () => {
    const router = useRouter()
    const { username } = router.query
    //this should find the corresponding user and check if the token matches
    //if there is a corresponding user but token does not match show just detail
    //if both match show buttons for settings and dashboard
    
    return (
        <>
            <Details />
            <Buttons />
        </>
    )
}

export default Dashboard