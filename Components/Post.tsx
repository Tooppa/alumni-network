import Image from 'next/image'

const Post = ({data}: any) => {
    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-col w-full max-w-3xl  border border-solid border-gray-900 p-7">
                <h1 className="text-xl font-semibold">{data.title}</h1>
                <p>{data.text}</p>
            </div>
        </div>
    )
}

export default Post