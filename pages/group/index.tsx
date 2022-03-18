import type { NextPage } from "next";
import React from "react";
import CardGrid from "../../Components/Layout/CardGrid";
import GroupPreview from "../../Components/GroupPreview";
import CreateGroup from "./CreateGroup";
import { GroupType } from "../../Types/Data";

type GroupCardProps = {
    children: React.ReactNode
}

const Groups: NextPage<GroupCardProps> = ({ children }) => {
    const fakeGroupPreview: GroupType = {
        name: "Amazing group",
        users: [1, 2],
        posts: [1, 2],
        id: 0,
        description: "",
        isPrivate: false
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