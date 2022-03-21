import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import type { NextPage } from "next";
import React from "react";
import { useQuery } from "react-query";
import CardGrid from "../../Components/Layout/CardGrid";
import TopicPreview from "../../Components/TopicPreview";
import { getTopics } from "../../Queries/Topic";
import { TopicType } from "../../Types/Data";
import CreateTopic from "./CreateTopic";

type TopicCardProps = {
    children: React.ReactNode
}

const Topics: NextPage<TopicCardProps> = () => {
    const { keycloak } = useKeycloak<KeycloakInstance>();
    const token: string | undefined = keycloak?.token;
    const { data, status } = useQuery<Array<TopicType>>('topics', () => getTopics(token), {enabled: !!token})

    return (
      <>
        <CreateTopic />
        {status === 'success' ?
        <CardGrid>
          {data?.map((t, id) => (
            <TopicPreview key={id} topicPreview={t} />
          ))}
        </CardGrid>
        :
        // TODO: Implement loading placeholders and/or show error when status is 'error'?
        <></>
        }
      </>
    );
}

export default Topics