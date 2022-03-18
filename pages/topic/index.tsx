import type { NextPage } from "next";
import React from "react";
import CardGrid from "../../Components/CardGrid";
import TopicPreview from "../../Components/TopicPreview";
import CreateTopic from "./CreateTopic";

type TopicCardProps = {
    children: React.ReactNode
}

const Topics: NextPage<TopicCardProps> = ({children}) => {
    const fakeTopicPreview = {
        name: "Amazing topic",
        users: [
            {
                name: "Batman"
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