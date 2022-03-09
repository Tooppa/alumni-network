import Image from 'next/image';
import React from 'react';

const CreatePost = () => {
    return (
        <div className="container mx-auto my-6 max-w-screen-md p-4 bg-white shadow-md rounded-lg">
            <div className="px-4 py-2">
                <div className="flex mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full mx-2 bg-blue-400">
                        <Image width={24} height={24} src="/vercel.svg" alt="user photo" />
                    </div>
                    <input type="text" className="w-full border border-gray-200  rounded-md px-2 text-sm text-gray-600 focus:outline-none focus:border-gray-300" placeholder="Title" />
                </div>
                <textarea rows={4} className="border border-gray-200 w-full p-2 mb-2 text-sm text-gray-600 rounded-md focus:outline-none focus:border-gray-300" placeholder="Post something..."></textarea>
                <div className="flex">
                    <button type="button" className="text-white ml-auto bg-blue-500 hover:bg-blue-600 rounded-md text-sm px-5 py-2 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-current text-white h-4 mr-2">
                            <path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost