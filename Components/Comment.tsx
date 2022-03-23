import { useKeycloak } from "@react-keycloak/ssr"
import Link from "next/link"
import React, { useState } from "react"
import { useQuery } from "react-query"
import { deletePost, getPost } from "../Queries/Post"
import { getUser } from "../Queries/User"
import { UserType } from "../Types/Data"

const Comment: React.FC<{id: number}>= ({id}) =>{
    const { keycloak } = useKeycloak()
    const token: string | undefined = keycloak?.token
    const { data: post, status } = useQuery(['comment', id], () => getPost(id, token), {enabled: !!token})
    const [showDelete, setShowDelete] = useState<boolean | undefined>(undefined);
    const [show, setShow] = useState<boolean>(true);
    const { refetch } = useQuery('delete' + id, () => deletePost(id, token), { enabled: false })
    const { data, status: userStatus } = useQuery<UserType>('currentuser', () => getUser(token), { enabled: !!token })

    if (userStatus === "success" && showDelete === undefined && status === "success")
        setShowDelete(data.id === post.senderId)
    
    const handleDelete = () => {
        refetch()
        setShow(false)
    }

    if (status === "success")
        return show ?
            <div className="flex group p-2 hover:bg-slate-50">
                <div className="text-sm text-gray-800">
                    <Link href={`/user/${encodeURIComponent(post.senderId)}`}>
                        <a className="font-semibold hover:underline">
                            {post.senderName}
                        </a>
                    </Link>
                    <div className="ml-2">{post.body}</div>
                </div>
                <div className="hidden ml-auto mr-4 group-hover:flex">
                    {showDelete &&
                        <button type="button" className="" onClick={() => handleDelete()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="fill-current text-gray-500 h-3 hover:text-gray-400">
                                <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                            </svg>
                        </button>
                    }
                </div>
            </div> :
            <></>
    else return <></>
}
export default Comment