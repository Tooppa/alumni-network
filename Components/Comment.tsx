import Link from "next/link"

const Comment = () =>{
    return (
        <div className="text-sm mb-4 text-gray-800">
            <Link href="/">
                <a className="font-semibold hover:underline">
                    {"test"}
                </a>
            </Link>
            <div className="ml-2">{"test"}</div>
        </div>
    )
}
export default Comment