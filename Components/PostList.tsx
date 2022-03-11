import Post from "./Post"

const PostList = ({ data } : any) => {
    return (
        <>
            {data.map((post: any) => <Post key={post.id} post={post}/>)}
        </>
    )
}
export default PostList