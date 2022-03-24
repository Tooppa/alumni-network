import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { PostType, UserType } from "../Types/Data";
import Comment from "./Comment";
import { formatDistanceToNow } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useQuery } from "react-query";
import { getUser } from "../Queries/User";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { deletePost } from "../Queries/Post";
import CreateComment from "./CreateComment";

const Post: React.FC<{ post: PostType, token: string }> = ({ post, token }) => {
    const [showDelete, setShowDelete] = useState<boolean | undefined>(undefined);
    const [show, setShow] = useState<boolean>(true);
    const [commentsVisible, setCommentsVisible] = useState(false);
    
    const { data, status } = useQuery<UserType>('currentuser', () => getUser(token))
    const { refetch } = useQuery('delete' + post.id, () => deletePost(post.id, token), { enabled: false })

    const formatTimeStamp = (timestamp: Date) => {
        // The server hosting the API is located in Azure's North Europe data center i.e. Ireland
        return formatDistanceToNow(
            zonedTimeToUtc(new Date(timestamp), "Europe/Dublin"),
            { addSuffix: true, includeSeconds: true }
        );
    };

    if (status === "success" && showDelete === undefined)
        setShowDelete(data.id === post.senderId)

    const handleDelete = () => {
        refetch()
        setShow(false)
    }

    return show ? <>
        <div className="bg-white my-2 p-4 ">
            <div className="px-4 py-2">
                <div className="flex mb-6 items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full mr-6 ring-2 ring-green-400">
                        <Link href={`/user/${encodeURIComponent(post.senderId)}`}>
                            <a className="flex items-center justify-center">
                                <Image width={48} height={48} src={`/api/imagefetcher?url=${encodeURIComponent(post.senderPictureURL)}`} alt="profile pic" className="object-cover rounded-full" />
                            </a>
                        </Link>
                    </div>
                    <div>
                        <h1 className="text-xl text-gray-800">{post.title}</h1>
                        <div className="flex text-xs text-gray-600">
                            <p className="">
                                Posted by
                                <Link href={`/user/${encodeURIComponent(post.senderId)}`}>
                                    <a className="ml-1 hover:underline">{post.senderName}</a>
                                </Link>
                            </p>
                            <span className="mx-1">·</span>
                            <p>{formatTimeStamp(post.timestamp)}</p>
                        </div>
                    </div>
                </div>
                <div className="mb-6 text-sm text-gray-800">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.body}
                    </ReactMarkdown>
                </div>
                <div>
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="flex ml-2 items-center"
                            onClick={() => setCommentsVisible(!commentsVisible)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="fill-current text-gray-500 h-4 hover:text-gray-400"
                            >
                                <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z" />
                            </svg>
                            <p className="ml-2 text-gray-800 text-sm">
                                {post.replies.length}
                            </p>
                        </button>
                        {showDelete &&
                            <button type="button" className="flex ml-6 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    className="fill-current text-gray-500 h-4 hover:text-gray-400"
                                    onClick={() => handleDelete()}
                                >
                                    <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                                </svg>
                            </button>
                        }
                    </div>

                    {commentsVisible && (
                        <div className="mt-6">
                            <hr className="border-gray-300" />
                            <div className="my-6">
                                {post.replies.map((id: number) => (
                                    <Comment key={id} id={id} token={token}/>
                                ))}
                            </div>
                            {post.replies.length <= 0 && (
                                <div className="flex my-6 justify-center items-center">
                                    <p className="text-sm text-gray-500">No comments yet</p>
                                </div>
                            )}
                            <CreateComment post={post} token={token}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <hr className="border-gray-300 last-of-type:hidden" />
    </>:
    <></>
};

export default Post;
