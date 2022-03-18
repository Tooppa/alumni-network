import Link from "next/link"
import React from "react"
import { TopicType } from "../Types/Data"
import Modal from "react-modal"
import TopicDetails from "./TopicDetails"
import { useRouter } from "next/router"
import { useKeycloak } from "@react-keycloak/ssr"
import { KeycloakInstance } from "keycloak-js"
import { useQuery } from "react-query"
import { getTopic } from "../Queries/Topic"
import Content from "./Layout/Content"

const TopicPreview: React.FC<{topicPreview: TopicType}> = ({topicPreview}) => {
    const router = useRouter()
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token
    const { data, status } = useQuery<TopicType>('topic', () => getTopic(Number(router.query.id), token), {enabled: !!token && !!router.query.id})
    return (
        <div className="bg-white p-4 rounded-sm shadow-md duration-150 hover:scale-105">
            <div className="pl-4">
                <h1 className="text-lg text-gray-800">{topicPreview.name}</h1>
                <div className="flex ml-1 mb-2">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-current text-gray-500 h-2">
                            <path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z" />
                        </svg>
                        <p className="text-xs ml-2 text-gray-800">{topicPreview.posts.length}</p>
                    </div>
                </div>
                <div>
                    <Link href={`/?id=${topicPreview.id}`} as={`/topic/${topicPreview.id}`}>
                        <a className="text-xs text-gray-800 hover:underline">
                            View topic →
                        </a>
                    </Link>
                </div>
            </div>
            <Modal isOpen={!!router.query.id} onRequestClose={() => router.push("/")} className="p-0 m-[30vh]">
                <Content>
                    {status === "success" && <TopicDetails topic={data as TopicType} />}
                </Content>
            </Modal>
        </div>
    )
}

export default TopicPreview