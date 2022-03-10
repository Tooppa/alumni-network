import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Post = ({ user, post, comment }: any) => {
    const [commentsVisible, setCommentsVisible] = useState(false);

    return (
        <div className="bg-white mb-6 p-4 rounded-lg shadow-md">
            <div className="px-4 py-2">
                <div className="flex mb-8 items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full mr-6 bg-blue-400">
                        <Link href="/">
                            <a className="flex items-center justify-center p-1">
                                <Image width={48} height={48} src="/vercel.svg" alt="user photo" />
                            </a>
                        </Link>
                    </div>
                    <div>
                        <h1 className="text-xl text-gray-800">{post.title}</h1>
                        <p className="text-xs text-gray-600">Posted by {user.name}</p>
                    </div>
                </div>
                <div className="mb-8">
                    <p className="text-sm text-gray-800">{post.text}</p>
                </div>
                <div>
                    <button type="button" className="" onClick={() => setCommentsVisible(!commentsVisible)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-current text-gray-600 h-5 hover:text-gray-500">
                            <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z" />
                        </svg>
                    </button>
                    {commentsVisible &&
                        <div className="mt-6">
                            <div className="text-gray-800 text-sm mb-4">{user.name}{": "}{comment.text}</div>
                            <input type="text" placeholder="Comment..." className="border border-gray-500 w-full" />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Post