import React from "react"
import { PostType } from "../Types/Data"
import Post from "./Post"

const PostList: React.FC<{data: Array<PostType>}> = ({ data }) => {
    return (
        <>
            {data.map((post: PostType) => <Post key={post.id} post={post}/>)}
        </>
    )
}
export default PostList