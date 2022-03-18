import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { postUserById } from '../../../../Queries/User'
import { UserType } from '../../../../Types/Data'

const SettingsForm: React.FC<{user: UserType}> = ({ user }) => {
    const [name, setName] = useState(user.name)
    const [bio, setBio] = useState(user.bio)
    const [fact, setFact] = useState(user.funFact)
    const [status, setStatus] = useState(user.status)

    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token

    const registerUser = async (event: FormEvent) => {
        event.preventDefault()
        const newUser: UserType = {
            name: name,
            bio: bio,
            funFact: fact,
            pictureURL: user.pictureURL,
            status: status,
        };
        postUserById(user.id as number,newUser,token)
    }
    
    return (
        <div className="bg-white my-6 p-4 rounded-sm shadow-lg">
                <div className="text-gray-800 text-2xl font-base text-center">
                    <h1>Settings</h1>
                </div>
            <form onSubmit={registerUser} className="grid grid-cols-4">
                <div className="col-span-1 p-6">
                    <div className="rounded-full ring-2 ring-green-400 flex">
                        <label htmlFor="image-upload" className="cursor-pointer hover:opacity-80">
                            <Image src={`/api/imagefetcher?url=${encodeURIComponent(user.pictureURL)}`} alt="Profile pic" width={200} height={200} />
                        </label>
                        <input id="image-upload" type="file" className="hidden" />
                    </div>
                    <p className="text-center pt-2 text-sm">Click the photo to upload a new one</p>
                </div>
                <div className="col-span-3 p-6">
                    <div className="">
                        <label className="text-sm p-1">Name:</label>
                        <input onChange={e => setName(e.target.value)} value={name} type="text" className="w-full border border-gray-200 rounded-sm mb-3 px-2 py-1 text-sm text-gray-600 focus:outline-none focus:border-gray-300"/>
                        <label className="text-sm p-1">Status:</label>
                        <input onChange={e => setStatus(e.target.value)} value={status} type="text" className="w-full border border-gray-200 rounded-sm mb-3 px-2 py-1 text-sm text-gray-600 focus:outline-none focus:border-gray-300"/>
                        <label className="text-sm p-1">Bio:</label>
                        <textarea onChange={e => setBio(e.target.value)} value={bio} rows={2} className="border border-gray-200 w-full mb-2 px-2 py-1 text-sm text-gray-600 rounded-sm focus:outline-none focus:border-gray-300"/>
                        <label className="text-sm p-1">Fun fact:</label>
                        <textarea onChange={e => setFact(e.target.value)} value={fact} rows={2} className="w-full border border-gray-200 rounded-sm mb-2 px-2 py-1 text-sm text-gray-600 focus:outline-none focus:border-gray-300"/>
                    </div>
                    <div className="flex">
                        <div className="ml-auto">
                            <button type="submit" className="text-white mr-2 bg-green-400 shadow hover:bg-green-300 rounded-sm text-sm px-3 py-2 text-center">Save</button>
                            <button type="reset" className="text-white bg-red-400 shadow hover:bg-red-300 rounded-sm text-sm px-3 py-2 text-center">Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SettingsForm