import React from "react";

export default function Custom404() {
    //this page runs when the next.js does not find a matching route
    return <>
        <h1 className="text-center font-extrabold text-9xl text-gray-800 pt-20">
            404
        </h1>
        <p className="text-center text-gray-800 text-xl p-4">Page not found</p>
    </>
}