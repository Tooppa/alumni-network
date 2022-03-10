import React from 'react';

type ContentProps = {
    children: React.ReactNode
};

export default function Content({ children }: ContentProps) {
    return (
        <>
            <div className="container mx-auto max-w-screen-md flex-grow">
                {children}
            </div>
        </>
    )
}