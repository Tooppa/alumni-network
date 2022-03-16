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

    
    const fakeGroup = {
        name: "Amazing group",
        description: "Both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass.",
        isPrivate: true,
        isJoined: false,
        users: [
            {
                username: "Batman"
            },
            {
                username: "Spiderman"
            }
        ],
        posts: [
            {
                title: "This is test post"
            }
        ]
    }
    if (status === "success")
        return (
            <>
                <GroupDetails group={data} />
            </>
        )
    else return <></>
}

export default Group