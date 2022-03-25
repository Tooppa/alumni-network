import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getGroup } from "../../../Queries/Group";
import { GroupType } from "../../../Types/Data";
import GroupDetails from "../../../Components/GroupDetails";
import Head from "next/head";

const Group: NextPage = () => {
    const router = useRouter()
    const { groupname } = router.query
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token
    const { data, status } = useQuery<GroupType>('group' + groupname, () => getGroup(Number(groupname), token), {enabled: !!token})

    if (status === "success" && !!token){
        //if there is no corresponding group query prints out a string 
        if(typeof(data) != "object")
            return <>
                <p>{data}</p>
            </>
        return (
            <>
                <Head>
                    <title>Group | Alumni Network</title>
                    <meta name="description" content="Welcome to Alumni Network" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <GroupDetails groupId={Number(groupname)} token={token}/>
            </>
        )
    }
    else return <></>
}

export default Group