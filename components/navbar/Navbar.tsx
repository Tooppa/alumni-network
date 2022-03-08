import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return(
        <div className="flex items-center flex-wrap bg-gray-800 p-3">
            <Link href="/">
                <a className="p-2 mr-4">
                    <span className="text-white text-xl uppercase">
                        alumni network
                    </span>
                </a>
            </Link>
            <div className="inline-flex flex-row ml-auto w-auto items-end">
                <Link href="/">
                    <a className="text-white px-3 py-2 inline-flex">
                        Profile
                    </a>
                </Link>
                <Link href="/">
                    <a className="text-white px-3 py-2 inline-flex">
                        Settings
                    </a>
                </Link>
                <Link href="/">
                    <a className="text-white px-3 py-2 inline-flex">
                        Logout
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default Navbar