import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getGroup, getGroups } from "../../../Queries/Group";
import { GroupType } from "../../../Types/Data";
import GroupDetails from "./GroupDetails";

const Group: NextPage = () => {
    const router = useRouter()
    const { groupname } = router.query
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token
    const { data, status } = useQuery<GroupType>('group', () => getGroup(Number(groupname), token), {enabled: !!token})

    if (status === "success"){
        //if there is no corresponding group query prints out a string 
        if(typeof(data) != "object")
            return <>
                <p>{data}</p>
            </>
        return (
            <>
                <GroupDetails group={data} />
            </>
        )
    }
    else return <></>
}

export default Group