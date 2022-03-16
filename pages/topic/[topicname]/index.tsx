import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getTopic } from "../../../Queries/Topic";
import TopicDetails from "./TopicDetails";

const Topic: NextPage = () => {
    const router = useRouter()
    const { topicname } = router.query
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token
    const { data, status } = useQuery('topic', () => getTopic(Number(topicname), token), {enabled: !!token})

    const fakeTopic = {
        name: "Front end problems",
        description: "Both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass.",
        isSubscribed: false,
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

    return (
        <>
            <TopicDetails topic={data} />
        </>
    )
}

export default Topic