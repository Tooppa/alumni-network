import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { postUserById } from '../../../../Queries/User'
import { UserType } from '../../../../Types/Data'

const SettingsForm: React.FC<{user: UserType}> = ({ user }) => {
    const [name, setName] = useState<string>(user.name)
    const [bio, setBio] = useState<string>(user.bio)
    const [fact, setFact] = useState<string>(user.funFact)
    const [status, setStatus] = useState<string>(user.status)
    const [postCreated, setPostCreated] = useState<boolean>(false);

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
        <>
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
                            <input onChange={e => setName(e.target.value)} value={name} type="text" className="w-full border border-gray-200 rounded-sm mb-3 px-2 py-1 text-sm text-gray-600 focus:outline-none focus:border-gray-300" />
                            <label className="text-sm p-1">Status:</label>
                            <input onChange={e => setStatus(e.target.value)} value={status} type="text" className="w-full border border-gray-200 rounded-sm mb-3 px-2 py-1 text-sm text-gray-600 focus:outline-none focus:border-gray-300" />
                            <label className="text-sm p-1">Bio:</label>
                            <textarea onChange={e => setBio(e.target.value)} value={bio} rows={2} className="border border-gray-200 w-full mb-2 px-2 py-1 text-sm text-gray-600 rounded-sm focus:outline-none focus:border-gray-300" />
                            <label className="text-sm p-1">Fun fact:</label>
                            <textarea onChange={e => setFact(e.target.value)} value={fact} rows={2} className="w-full border border-gray-200 rounded-sm mb-2 px-2 py-1 text-sm text-gray-600 focus:outline-none focus:border-gray-300" />
                        </div>
                        <div className="flex">
                            <div className="ml-auto">
                                <button onClick={() => setPostCreated(!postCreated)} type="submit" className="text-white mr-2 bg-green-400 shadow hover:bg-green-300 rounded-sm text-sm px-3 py-2 text-center">Save</button>
                                <button type="reset" className="text-white bg-red-400 shadow hover:bg-red-300 rounded-sm text-sm px-3 py-2 text-center">Cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {postCreated &&
                <div className="flex bg-green-300 my-4 p-4 rounded-sm shadow-md">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-current text-white h-4 mr-3">
                            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z" />
                        </svg>
                        <p className="text-white text-sm">User settings saved!</p>
                    </div>
                    <div className="flex ml-auto">
                        <button type="button" className="" onClick={() => setPostCreated(!postCreated)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="fill-current text-white h-4 hover:text-gray-50">
                                <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                            </svg>
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default SettingsForm