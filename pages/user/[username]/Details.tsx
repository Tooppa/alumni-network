import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { UserType } from '../../../Types/Data'

const Details: React.FC<{user: UserType}> = ({user}) => {
    return (
        <div className="bg-white my-6 p-4 rounded-sm shadow-md">
            <div className="grid grid-cols-4">
                <div className="col-span-1 p-6">
                    <div className="flex rounded-full ring-2 ring-green-400">
                        <Image src={`/api/imagefetcher?url=${encodeURIComponent(user.pictureURL)}`} alt="Profile pic" className="object-cover rounded-full" width={200} height={200} />
                    </div>
                    <div className="flex justify-center mt-4">
                        <button type="button" className="text-white bg-green-400 shadow hover:bg-green-300 rounded-full text-sm px-5 py-1 text-center">
                            <Link href="/settings">
                                Edit profile
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="col-span-3 p-6">
                    <div className="mb-4">
                        <h1 className="text-2xl font-base text-gray-800">{user.name}</h1>
                        <h3 className="text-md text-gray-500 font-light">{user.status}</h3>
                    </div>
                    <div className="text-gray-800 text-sm mb-4">
                        <p className="font-bold text-md mb-1">Bio:</p>
                        <p>{user.bio}</p>
                    </div>
                    <div className="text-gray-800 text-sm">
                        <p className="font-bold text-md mb-1">Fun fact:</p>
                        <p>{user.funFact}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Details