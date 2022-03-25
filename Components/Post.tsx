import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PostType, UserType } from "../Types/Data";
import Comment from "./Comment";
import { formatDistanceToNow } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUser } from "../Queries/User";
import { deletePost } from "../Queries/Post";
import CreateComment from "./CreateComment";

const Post: React.FC<{ post: PostType, token: string, postList: string }> = ({ post, token, postList }) => {
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [commentsVisible, setCommentsVisible] = useState(false);

    const queryClient = useQueryClient();

    const { data, status } = useQuery<UserType>('currentuser', () => getUser(token))

    const mutation = useMutation(() => deletePost(post.id, token), {
        onSuccess: () => {
            queryClient.invalidateQueries(postList)
            queryClient.invalidateQueries('group'+post.targetGroupId)
            queryClient.invalidateQueries('topic'+post.targetTopicId)
        }
    })

    const formatTimeStamp = (timestamp: Date) => {
        // The server hosting the API is located in Azure's North Europe data center i.e. Ireland
        return formatDistanceToNow(
            zonedTimeToUtc(new Date(timestamp), "Europe/Dublin"),
            { addSuffix: true, includeSeconds: true }
        );
    };

    const handleDelete = () => {
        mutation.mutate()
    }

    useEffect(()=>{
        if (status === "success")
            setShowDelete(data.id === post.senderId)
    }, [status, data, post.senderId])

    return <>
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
                            <p>
                                Posted by
                                <Link href={`/user/${encodeURIComponent(post.senderId)}`}>
                                    <a className="ml-1 hover:underline">{post.senderName}</a>
                                </Link>
                            </p>
                            <span className="mx-1">·</span>
                            <p>{formatTimeStamp(post.timestamp)}</p>
                            <span className="mx-1">·</span>
                            {post.groupName !== null &&
                                <Link href={`/group/${encodeURIComponent(post.targetGroupId)}`}>
                                    <a className="flex hover:underline">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="fill-current text-gray-500 h-3 mr-1">
                                            <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z" />
                                        </svg>
                                        <span>{post.groupName}</span>
                                    </a>
                                </Link>
                            }
                            {post.topicName !== null &&
                                <Link href={`/topic/${encodeURIComponent(post.targetTopicId)}`}>
                                    <a className="flex hover:underline">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="fill-current text-gray-500 h-3 mr-1">
                                            <path d="M256 0v128h128L256 0zM224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM272 416h-160C103.2 416 96 408.8 96 400C96 391.2 103.2 384 112 384h160c8.836 0 16 7.162 16 16C288 408.8 280.8 416 272 416zM272 352h-160C103.2 352 96 344.8 96 336C96 327.2 103.2 320 112 320h160c8.836 0 16 7.162 16 16C288 344.8 280.8 352 272 352zM288 272C288 280.8 280.8 288 272 288h-160C103.2 288 96 280.8 96 272C96 263.2 103.2 256 112 256h160C280.8 256 288 263.2 288 272z" />
                                        </svg>
                                        <span>{post.topicName}</span>
                                    </a>
                                </Link>
                            }
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
                                    <Comment key={id} id={id} token={token} postList={postList} />
                                ))}
                            </div>
                            {post.replies.length <= 0 && (
                                <div className="flex my-6 justify-center items-center">
                                    <p className="text-sm text-gray-500">No comments yet</p>
                                </div>
                            )}
                            <CreateComment post={post} token={token} postList={postList}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <hr className="border-gray-300 last-of-type:hidden" />
    </>
};

export default Post;
