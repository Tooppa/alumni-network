import React, { useState } from "react"
import { PostType } from "../Types/Data"
import Post from "./Post"
import InfiniteScroll from 'react-infinite-scroll-component';

const PostList: React.FC<{data: Array<PostType>}> = ({ data }) => {
    
    const [posts, setPosts] = useState(data.slice(0, 4));
    const [hasMore, setHasMore] = useState(true);

    const fetchData = () => {
        if (data.length < posts.length + 4) {
            setPosts(posts.concat(data.slice(posts.length - 1, data.length - 1)));
            setHasMore(false);
        }
        setPosts(posts.concat(data.slice(posts.length - 1, posts.length + 4)));
    }

    return (
        <>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<h4 className="my-4 text-sm text-gray-500 flex justify-center">Loading...</h4>}
                endMessage={
                    <p className="my-4 text-sm text-gray-500 flex justify-center">
                        No more posts left.
                    </p>
                }
            >
            {posts.map((post: PostType, index: number) => <Post key={index} post={post}/>)}
            </InfiniteScroll>
        </>
    )
}
export default PostList