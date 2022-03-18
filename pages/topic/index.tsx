import type { NextPage } from "next";
import React from "react";
import CardGrid from "../../Components/Layout/CardGrid";
import TopicPreview from "../../Components/TopicPreview";
import { TopicType } from "../../Types/Data";
import CreateTopic from "./CreateTopic";

type TopicCardProps = {
    children: React.ReactNode
}

const Topics: NextPage<TopicCardProps> = ({children}) => {
    const fakeTopicPreview: TopicType = {
        name: "Amazing topic",
        posts: [1, 2],
        id: 0,
        description: ""
    }

    return (
        <>
            <CreateTopic />
            <CardGrid>
                <TopicPreview topicPreview={fakeTopicPreview} />
                <TopicPreview topicPreview={fakeTopicPreview} />
                <TopicPreview topicPreview={fakeTopicPreview} />
            </CardGrid>
        </>
    )
}

export default Topics