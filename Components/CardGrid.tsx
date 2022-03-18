import React from "react"

type CardProps = {
    children: React.ReactNode
};

export default function CardGrid({children}: CardProps) {
    return (
        <div className="my-6">
            <div className="grid grid-cols-2 gap-4">
                {children}
            </div>
        </div>
    )
}
