import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { getUser, postUserById } from '../../../../Queries/User'
import { UserType } from '../../../../Types/Data'
import Notification from '../../../../Components/Notification'
import Link from 'next/link'
import { useQuery } from 'react-query'

const SettingsForm: React.FC<{user: UserType}> = ({ user }) => {
    const [name, setName] = useState<string>(user.name)
    const [bio, setBio] = useState<string>(user.bio)
    const [fact, setFact] = useState<string>(user.funFact)
    const [workStatus, setWorkStatus] = useState<string>(user.status)
    const [created, setCreated] = useState<boolean>(false);

    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token
    const { data, status } = useQuery<UserType>('currentuser', () => getUser(token), {enabled: !!token})

    const registerUser = async (event: FormEvent) => {
        event.preventDefault()
        const newUser: UserType = {
            name: name,
            bio: bio,
            funFact: fact,
            pictureURL: user.pictureURL,
            status: workStatus,
        };
        postUserById(user.id as number,newUser,token)
    }
    
    return (
        <>
            {status === "success" &&
                <div>
                    <div className="bg-white my-6 p-4 rounded-sm shadow-md">
                        <div className="text-gray-800 text-2xl mt-2 mb-4 text-center">
                            <h1>Settings</h1>
                        </div>
                        <form onSubmit={registerUser} className="grid grid-cols-4">
                            <div className="col-span-1 px-4 py-2">
                                <div className="rounded-full ring-2 ring-green-400 flex relative overflow-hidden">
                                    <label htmlFor="image-upload" className="flex items-center justify-center cursor-pointer hover:opacity-80">
                                        <Image src={`/api/imagefetcher?url=${encodeURIComponent(user.pictureURL)}`} alt="Profile pic" width={200} height={200} className="object-cover rounded-full opacity-30" />
                                        <p className="absolute text-xs text-center">Change profile image</p>
                                    </label>
                                    <input id="image-upload" type="file" className="hidden" />
                                </div>
                            </div>
                            <div className="col-span-3 px-4 py-2">
                                <div className="">
                                    <label className="text-sm p-1">Username:</label>
                                    <input onChange={e => setName(e.target.value)} value={name} type="text" className="w-full border border-gray-200 rounded-sm mb-2 px-2 py-1 text-sm text-gray-600 focus:outline-none focus:border-gray-300" disabled />
                                    <label className="text-sm p-1">Status:</label>
                                    <input onChange={e => setWorkStatus(e.target.value)} value={workStatus} type="text" className="w-full border border-gray-200 rounded-sm mb-2 px-2 py-1 text-sm text-gray-600 focus:outline-none focus:border-gray-300" />
                                    <label className="text-sm p-1">Bio:</label>
                                    <textarea onChange={e => setBio(e.target.value)} value={bio} rows={4} maxLength={300} className="w-full border border-gray-200 mb-2 px-2 py-1 text-sm text-gray-600 rounded-sm resize-none focus:outline-none focus:border-gray-300" />
                                    <label className="text-sm p-1">Fun fact:</label>
                                    <input onChange={e => setFact(e.target.value)} value={fact} className="w-full border border-gray-200 rounded-sm mb-4 px-2 py-1 text-sm text-gray-600 focus:outline-none focus:border-gray-300" />
                                </div>
                                <div className="flex">
                                    <div className="ml-auto">
                                        <button onClick={() => setCreated(!created)} type="submit" className="text-white mr-2 bg-green-400 shadow hover:bg-green-300 rounded-full text-sm px-5 py-1 text-center">Save</button>
                                        <button type="reset" className="text-white bg-red-400 shadow hover:bg-red-300 rounded-full text-sm px-5 py-1 text-center">
                                            <Link href={`/user/${data?.id}`}>
                                                Cancel
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Notification str="Settings updated" created={created} setCreated={setCreated} />
                </div>
            }
        </>
    )
}

export default SettingsForm