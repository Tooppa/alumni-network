import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { PostType } from '../Types/Data'
import Comment from './Comment'
import { formatDistanceToNow } from 'date-fns'
import { zonedTimeToUtc} from 'date-fns-tz'

const Post: React.FC<{post: PostType}> = ({ post }) => {
    const [commentsVisible, setCommentsVisible] = useState(false);

    const formatTimeStamp = (timestamp: Date) => {
        // The server hosting the API is located in Azure's North Europe data center i.e. Ireland
        return formatDistanceToNow(zonedTimeToUtc(new Date(timestamp), "Europe/Dublin"),{ addSuffix: true, includeSeconds: true });
    }

    return (
        <div className="bg-white my-2 p-4 ">
            <div className="px-4 py-2">
                <div className="flex mb-8 items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full mr-6 bg-green-300">
                        <Link href="/">
                            <a className="flex items-center justify-center p-1">
                                <Image width={48} height={48} src="/vercel.svg" alt="profile pic" />
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
                <div className="mb-8">
                    <p className="text-sm text-gray-800">{post.body}</p>
                </div>

                <div>
                    <button type="button" className="flex ml-2" onClick={() => setCommentsVisible(!commentsVisible)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-current text-gray-600 h-5 hover:text-gray-500">
                            <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z" />
                        </svg>
                        <p className="ml-2 text-gray-800 text-sm">{post.replies.length}</p>
                    </button>

                    {commentsVisible &&
                        <div className="mt-6">
                            <hr className="border-gray-300" />
                            <div className="ml-2 my-6">
                                {post.replies.map((id: number) => <Comment key={id} id={id} />)}
                            </div>
                            {post.replies.length <= 0 &&
                                <div className="flex my-6 justify-center items-center">
                                    <p className="text-sm text-gray-500">No comments yet</p>
                                </div>
                            }
                            <div className="flex">
                                <input type="text" placeholder="Comment..." className="border border-gray-200 w-full rounded-sm px-2 py-1 text-gray-600 text-sm focus:outline-none focus:border-gray-300" />
                                <button type="submit" className="button text-white bg-green-400 rounded-full shadow text-center inline-flex items-center p-2 ml-2 hover:bg-green-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-current text-white h-4">
                                        <path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Post