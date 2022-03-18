import type { NextPage } from "next";
import React from "react";
import CardGrid from "../../Components/CardGrid";
import GroupPreview from "../GroupPreview";
import CreateGroup from "./CreateGroup";

type GroupCardProps = {
    children: React.ReactNode
}

const Groups: NextPage<GroupCardProps> = ({ children }) => {
    const fakeGroupPreview = {
        name: "Amazing group",
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
            <CreateGroup />
            <CardGrid>
                <GroupPreview groupPreview={fakeGroupPreview} />
                <GroupPreview groupPreview={fakeGroupPreview} />
                <GroupPreview groupPreview={fakeGroupPreview} />
            </CardGrid>
        </>
    )
}

export default Groups