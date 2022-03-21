import { useKeycloak } from "@react-keycloak/ssr"
import { KeycloakInstance } from "keycloak-js"
import React, { useState } from "react"
import { useQuery } from "react-query"
import { getPostsWithIds } from "../Queries/Post"
import { getUser } from "../Queries/User"
import { PostType, TopicType, UserType } from "../Types/Data"

const TopicDetails: React.FC<{topic: TopicType}> = ({ topic }) => {
    const [isSubscribed, setIsSubscribed] = useState<undefined | boolean>(undefined)
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token
    const { data, status } = useQuery<UserType>('user', () => getUser(token), {enabled: !!token})
    const { data: posts, status: postStatus } = useQuery<Array<PostType>>('postsTopic', () => getPostsWithIds(topic.posts, token), {enabled: !!token})

    if(status === "success" && isSubscribed != undefined)
        setIsSubscribed(!!(data.topics as Array<number>).find(g=> g == topic.id))
    
    return (
        <>
            <div className="bg-white my-6 p-4 rounded-sm shadow-lg">
                <div className="p-6">
                    <p className="text-xs text-gray-500">Topic</p>
                    <div className="flex mb-1 items-center">
                        <h1 className="text-2xl font-base text-gray-800 mr-6">{topic.name}</h1>
                        {isSubscribed === true &&
                            <div className="border border-green-300 rounded-xl flex items-center h-4 py-2 px-3 justify-center bg-green-400">
                                <p className="text-xs text-white">subscribed</p>
                            </div>
                        }
                    </div>
                    <div className="flex ml-2 mb-6">
                        <div className="flex items-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="fill-current text-gray-500 h-3">
                                <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
                            </svg>
                            {/*
                        <p className="text-sm ml-2 text-gray-800">{topic.users.length}</p>
                        */}
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-current text-gray-500 h-3">
                                <path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z" />
                            </svg>
                            <p className="text-sm ml-2 text-gray-800">{topic.posts.length}</p>
                        </div>
                    </div>
                    <div className="text-sm text-gray-800">
                        {topic.description}
                    </div>
                    <div className="mt-6">
                        {isSubscribed === false &&
                            <button type="button" className="text-white bg-green-400 shadow hover:bg-green-300 rounded-full text-sm px-5 py-1 text-center">
                                Subscribe
                            </button>
                        }
                        {isSubscribed === true &&
                            <button type="button" className="text-white bg-red-400 shadow hover:bg-red-300 rounded-full text-sm px-5 py-1 text-center">
                                Unsubscribe
                            </button>
                        }
                    </div>
                </div>
            </div>
            {}
        </>
    )
}

export default TopicDetails