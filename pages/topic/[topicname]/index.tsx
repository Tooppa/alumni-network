import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getTopic } from "../../../Queries/Topic";
import { TopicType } from "../../../Types/Data";
import TopicDetails from "./TopicDetails";

const Topic: NextPage = () => {
    const router = useRouter()
    const { topicname } = router.query
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token
    const { data, status } = useQuery<TopicType>('topic', () => getTopic(Number(topicname), token), {enabled: !!token})

    if (status === "success"){
        //if there is no corresponding topic query prints out a string 
        if(typeof(data) != "object")
            return <>
                <p>{data}</p>
            </>
        return (
            <>
                <TopicDetails topic={data} />
            </>
        )
    }
    else return <></>
}

export default Topic