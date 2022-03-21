import React from 'react';

export default function Content({ ...props}) {
    return (
        <>
            <div className="container mx-auto max-w-screen-md flex-grow">
                {props.children}
            </div>
        </>
    )
}