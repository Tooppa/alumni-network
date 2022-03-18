import { useKeycloak } from "@react-keycloak/ssr"
import { KeycloakInstance } from "keycloak-js"
import Link from "next/link"
import { useQuery } from "react-query"
import GroupPreview from "../Components/GroupPreview"
import TopicPreview from "../Components/TopicPreview"
import { getGroups } from "../Queries/Group"
import { getTopics } from "../Queries/Topic"
import { GroupType, TopicType } from "../Types/Data"

const Previews = () => {
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token
    const { data: topics, status: topicStatus } = useQuery<Array<TopicType>>('topics', () => getTopics(token), { enabled: !!token })
    const { data: groups, status: groupStatus } = useQuery<Array<GroupType>>('groups', () => getGroups(token), { enabled: !!token })
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
    const TopicsElement = () =>{
        if (topicStatus === "success")
            return <>
                <div className="flex ml-3 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-current text-gray-800 h-3">
                        <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM64 256C64 238.3 78.33 224 96 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H96C78.33 288 64 273.7 64 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
                    </svg>
                    <p className="text-sm text-gray-800 ml-2">Topics</p>
                </div>
                <div className="grid grid-cols-1 gap-4 my-4">
                    {topics.slice(0,3).map((t: TopicType) => <TopicPreview key={t.id} topicPreview={t}/>)}
                </div>
                <div className="ml-3">
                    <Link href="/topic">
                        <a className="text-sm text-gray-800 hover:underline">
                            View all topics →
                        </a>
                    </Link>
                </div>
            </>
        else return <></>
    }
    const GroupElement = () =>{
        if (groupStatus === "success")
            return <>
                <div className="flex ml-3 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-current text-gray-800 h-3">
                        <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM64 256C64 238.3 78.33 224 96 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H96C78.33 288 64 273.7 64 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
                    </svg>
                    <p className="text-sm text-gray-800 ml-2">Groups</p>
                </div>
                <div className="grid grid-cols-1 gap-4 my-4">
                    {groups.slice(0,3).map((g: GroupType) => <GroupPreview key={g.id} groupPreview={g}/>)}
                </div>
                <div className="ml-3">
                    <Link href="/group">
                        <a className="text-sm text-gray-800 hover:underline">
                            View all groups →
                        </a>
                    </Link>
                </div>
            </>
        else return <></>
    }


    return (
        <div className="my-6">
            <div className="grid grid-cols-2 gap-4">
                <div><TopicsElement /></div>
                <div><GroupElement/></div>
            </div>
        </div>
    )
}

export default Previews