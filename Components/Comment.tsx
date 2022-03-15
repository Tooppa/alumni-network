import { useKeycloak } from "@react-keycloak/ssr"
import Link from "next/link"
import React from "react"
import { useQuery } from "react-query"
import { getPost } from "../Queries/Post"
import { getUser } from "../Queries/User"

const Comment: React.FC<{id: number}>= ({id}) =>{
    const { keycloak } = useKeycloak()
    const token: string | undefined = keycloak?.token
    const { data: post } = useQuery(['comment', id], () => getPost(id, token), {enabled: !!token})
    const { data: user, status } = useQuery(['user', post?.senderId], () => getUser(post?.senderId, token), {enabled: !!post})
    if (status === "success")
        return (
            <div className="text-sm mb-4 text-gray-800">
                <Link href="/">
                    <a className="font-semibold hover:underline">
                        {user.name}
                    </a>
                </Link>
                <div className="ml-2">{post.body}</div>
            </div>
        )
    else return <></>
}
export default Comment