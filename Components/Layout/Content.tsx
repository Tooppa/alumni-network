import React from 'react';

export default function Content({ ...props}) {
    return (
        <>
            <div className="container mx-auto max-w-screen-md flex-grow px-4 md:px-0">
                {props.children}
            </div>
        </>
    )
}