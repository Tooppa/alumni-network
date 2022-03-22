const Loading: React.FC<{length?: number}> = ({length = 1}) => {
    return (
        length > 0 ?
            <div className="bg-white rounded-sm shadow-md">
                <h4 className="my-4 p-4 text-sm text-gray-500 flex justify-center">Loading...</h4>
            </div> :
            <h4 className="my-4 text-sm text-gray-500 flex justify-center">No posts.</h4>
    )
}
export default Loading