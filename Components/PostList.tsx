import Post from "./Post"

const PostList = ({ data } : any) => {
    console.log(data);
    
    return (
        <>
            {data.map((post: any) => <Post key={post.id} post={post}/>)}
        </>
    )
}
export default PostList