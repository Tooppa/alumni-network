import type { NextPage } from "next";
import { useRouter } from "next/router";
import GroupDetails from "./GroupDetails";

const Group: NextPage = () => {
    const router = useRouter()
    const { groupname } = router.query

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

    return (
        <>
            <GroupDetails group={fakeGroup} />
        </>
    )
}

export default Group