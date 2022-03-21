import React from "react"
import { PostType } from "../Types/Data"
import Post from "./Post"

const PostList: React.FC<{data: Array<PostType>}> = ({ data }) => {
    return (
        <div className="bg-white rounded-sm shadow-md">
            {data.map((post: PostType) => (
                <>
                    <Post key={post.id} post={post} />
                    <hr className="border-gray-300 last-of-type:hidden" />
                </>
            ))}
        </div>
    )
}
export default PostList