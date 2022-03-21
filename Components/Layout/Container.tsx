import React from 'react';

export default function Container({ ...props}) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">{props.children}</div>
    )
}