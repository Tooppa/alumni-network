import React, { useState } from "react"
import { PostType } from "../Types/Data"
import Post from "./Post"
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from "./Loading";

const PostList: React.FC<{data: Array<PostType>, token: string, postList: string}> = ({ data, token, postList }) => {
    const howManyPerFetch = 4
    const [amount, setAmount] = useState<number>(howManyPerFetch)
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchData = () => {
        setAmount(amount + howManyPerFetch)
        if (data.length < amount) {
            setHasMore(false);
        }
    }
    
    return (
        <div className="bg-white rounded-sm shadow-md">
            <InfiniteScroll
                dataLength={amount}
                next={fetchData}
                hasMore={hasMore}
                loader={<Loading length={data.length}/>}
                scrollableTarget="modal"
                // TODO: endMessage goes inside the last fragment for some reason, expanding it
                /*endMessage={
                    <p className="my-4 text-sm text-gray-500 flex justify-center">
                        No more posts left.
                    </p>
                }*/
            >
                {data.slice(0,amount).map((post: PostType, index: number) => (
                    <Post key={index} post={post} token={token} postList={postList}/>
                ))}
            </InfiniteScroll>
        </div>
    )
}
export default PostList