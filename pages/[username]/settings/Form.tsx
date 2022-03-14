import Image from 'next/image'
import { FormEvent } from 'react'

const SettingsForm = ({ data }: any) => {
    //currently empty function but in the future submitting a edited user could be done here
    const registerUser = async (event: FormEvent) => {
        event.preventDefault()
        /*
        const res = await fetch('/api/register', {
          body: JSON.stringify({
            name: event.target
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })

        const result = await res.json()
        // result.user => 'Ada Lovelace'*/
    }
    return (
        <div className="bg-white my-6 p-4 rounded-sm shadow-lg">
            <form onSubmit={registerUser} className="grid grid-cols-4">
                <div className="col-span-1 p-6">
                    <div className="rounded-full ring-2 ring-green-400 flex">
                        <label htmlFor="image-upload" className="cursor-pointer hover:opacity-50">
                            <Image src="/vercel.svg" alt="Profile pic" width={200} height={200} />
                        </label>
                        <input id="image-upload" type="file" className="hidden" />
                    </div>
                </div>
                <div className="col-span-3 p-6">
                    <div className="">
                        <div className="text-gray-800 text-2xl font-base mb-6">
                            <h1>Username</h1>
                        </div>
                        <div>
                            <input type="text" className="w-full border border-gray-200 rounded-sm mb-6 px-2 py-1 text-sm text-gray-600 focus:outline-none focus:border-gray-300" placeholder="Title" />
                            <textarea rows={4} className="border border-gray-200 w-full mb-4 px-2 py-1 text-sm text-gray-600 rounded-sm focus:outline-none focus:border-gray-300" placeholder="Post something..."></textarea>
                            <input type="text" className="w-full border border-gray-200 rounded-sm mb-6 px-2 py-1 text-sm text-gray-600 focus:outline-none focus:border-gray-300" placeholder="Title" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="ml-auto">
                            <button type="submit" className="text-white mr-2 bg-green-400 shadow hover:bg-green-300 rounded-sm text-sm px-3 py-2 text-center">Submit</button>
                            <button type="reset" className="text-white bg-red-400 shadow hover:bg-red-300 rounded-sm text-sm px-3 py-2 text-center">Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
            {/*
            <form onSubmit={registerUser} className="flex flex-col w-full max-w-3xl  border border-solid border-gray-900 p-7">
                <div className="flex justify-between m-2">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="border border-solid border-gray-900"
                    />
                </div>
                <div className="flex justify-between m-2">
                    <label htmlFor="workStatus">WorkStatus</label>
                    <input
                        id="workStatus"
                        name="workStatus"
                        type="text"
                        autoComplete="workStatus"
                        required
                        className="border border-solid border-gray-900"
                    />
                </div>
                <div className="flex justify-between m-2">
                    <label htmlFor="bio">Bio</label>
                    <input
                        id="bio"
                        name="bio"
                        type="text"
                        autoComplete="bio"
                        required
                        className="border border-solid border-gray-900"
                    />
                </div>
                <div className="flex justify-between m-2">
                    <label htmlFor="funFact">FunFact</label>
                    <input
                        id="funFact"
                        name="funFact"
                        type="text"
                        autoComplete="funFact"
                        required
                        className="border border-solid border-gray-900"
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            */}
        </div>
    )
}

export default SettingsForm