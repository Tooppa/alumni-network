import Image from 'next/image'

const Details = ({user}: any) => {
    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-row w-full max-w-3xl  border border-solid border-gray-900 p-7">
                <Image src={user.profilePic} alt="Profile pic" width={200} height={200} />
                <div className="flex flex-col justify-between text-left">
                    <div>
                        <h1 className="text-xl font-bold">{user.name}</h1>
                        <h3 className="text-lg">{user.workStatus}</h3>
                    </div>
                    <p>{user.bio}</p>
                    <p>Fun fact: {user.funFact}</p>
                </div>
            </div>
        </div>
    )
}

export default Details