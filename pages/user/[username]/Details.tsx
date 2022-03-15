import Image from 'next/image'
import Link from 'next/link'

const Details = ({user}: any) => {
    return (
        <div className="bg-white my-6 p-4 rounded-sm shadow-lg">
            <div className="grid grid-cols-4">
                <div className="col-span-1 p-6">
                    <div className="rounded-full ring-2 ring-green-400 flex">
                        <Image src={user.profilePic} alt="Profile pic" width={200} height={200} />
                    </div>
                    <div className="flex justify-center mt-4">
                        <button type="button" className="text-white bg-green-400 shadow hover:bg-green-300 rounded-sm text-sm px-5 py-1 text-center">
                            <Link href="/settings">
                                Edit profile
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="col-span-3 p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-base text-gray-800">{user.name}</h1>
                        <h3 className="text-md text-gray-500 font-light">{user.workStatus}</h3>
                    </div>
                    <div className="text-gray-800 text-sm mb-6">
                        <p className="font-bold text-md mb-2">Bio:</p>
                        <p>{user.bio}</p>
                    </div>
                    <div className="text-gray-800 text-sm">
                        <p className="font-bold text-md mb-2">Fun fact:</p>
                        <p>{user.funFact}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Details