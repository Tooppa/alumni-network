import React, { useEffect, useState } from "react"

const Filter: React.FC<{filter: Function}> = ({filter}) => {
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [all, setAll] = useState<boolean>(true)
    const [groups, setGroups] = useState<boolean>(false)
    const [topics, setTopics] = useState<boolean>(false)
    const [ownPosts, setOwnPosts] = useState<boolean>(false)
    const [postsWithReplies, setPostsWithReplies] = useState<boolean>(false)

    //sends the settings to the root index.html for handling
    const applyFilter = () => {
        filter(all,groups,topics,ownPosts,postsWithReplies)
    }

    useEffect(()=>{
        if(groups && topics && ownPosts && postsWithReplies)
            setAll(true)
        else if(all && (groups|| topics || ownPosts || postsWithReplies))
            setAll(false)
    }, [all, groups, topics, ownPosts, postsWithReplies])

    return (
        <div>
            <div className="flex">
                <div className="flex ml-auto mb-4 mr-3">
                    <button className="flex text-gray-500 text-sm items-center" onClick={() => setShowFilters(!showFilters)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-current text-gray-500 h-3">
                            <path d="M0 416C0 398.3 14.33 384 32 384H86.66C99 355.7 127.2 336 160 336C192.8 336 220.1 355.7 233.3 384H480C497.7 384 512 398.3 512 416C512 433.7 497.7 448 480 448H233.3C220.1 476.3 192.8 496 160 496C127.2 496 99 476.3 86.66 448H32C14.33 448 0 433.7 0 416V416zM192 416C192 398.3 177.7 384 160 384C142.3 384 128 398.3 128 416C128 433.7 142.3 448 160 448C177.7 448 192 433.7 192 416zM352 176C384.8 176 412.1 195.7 425.3 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H425.3C412.1 316.3 384.8 336 352 336C319.2 336 291 316.3 278.7 288H32C14.33 288 0 273.7 0 256C0 238.3 14.33 224 32 224H278.7C291 195.7 319.2 176 352 176zM384 256C384 238.3 369.7 224 352 224C334.3 224 320 238.3 320 256C320 273.7 334.3 288 352 288C369.7 288 384 273.7 384 256zM480 64C497.7 64 512 78.33 512 96C512 113.7 497.7 128 480 128H265.3C252.1 156.3 224.8 176 192 176C159.2 176 131 156.3 118.7 128H32C14.33 128 0 113.7 0 96C0 78.33 14.33 64 32 64H118.7C131 35.75 159.2 16 192 16C224.8 16 252.1 35.75 265.3 64H480zM160 96C160 113.7 174.3 128 192 128C209.7 128 224 113.7 224 96C224 78.33 209.7 64 192 64C174.3 64 160 78.33 160 96z" />
                        </svg>
                        <p className="ml-2">Filter</p>
                    </button>
                </div>
            </div>
            {showFilters &&
                <div className="bg-white rounded-sm p-4 shadow-md mb-4">
                    <div className="px-4 py-2">
                        <div className="text-gray-800">
                            <h1 className="text-sm font-semibold mb-4">Show posts:</h1>
                            <form className="ml-2">
                                <div className="flex items-center text-sm mb-2">
                                    <input
                                        type="checkbox"
                                        checked={all}
                                        id="all"
                                        onChange={() => setAll(!all)}
                                    />
                                    <label className="ml-2" htmlFor="all">All posts</label>
                                </div>
                                <div className="flex items-center text-sm mb-2">
                                    <input
                                        type="checkbox"
                                        checked={topics}
                                        id="topics"
                                        onChange={() => setTopics(!topics)}
                                    />
                                    <label className="ml-2" htmlFor="topics">Subscribed topics</label>
                                </div>
                                <div className="flex items-center text-sm mb-2">
                                    <input
                                        type="checkbox"
                                        checked={groups}
                                        id="groups"
                                        onChange={() => setGroups(!groups)}
                                    />
                                    <label className="ml-2" htmlFor="groups">Joined groups</label>
                                </div>
                                <div className="flex items-center text-sm mb-2">
                                    <input
                                        type="checkbox"
                                        checked={ownPosts}
                                        id="own"
                                        onChange={() => setOwnPosts(!ownPosts)}
                                    />
                                    <label className="ml-2" htmlFor="own">Your posts</label>
                                </div>
                                <div className="flex items-center text-sm">
                                    <input
                                        type="checkbox"
                                        checked={postsWithReplies}
                                        id="replies"
                                        onChange={() => setPostsWithReplies(!postsWithReplies)}
                                    />
                                    <label className="ml-2" htmlFor="replies">Posts with replies</label>
                                </div>
                            </form>
                        </div>
                        <div className="flex">
                            <button type="button" onClick={() => {setShowFilters(!showFilters); applyFilter();}}className="text-white ml-auto bg-green-400 shadow hover:bg-green-300 rounded-full text-sm px-3 py-1 text-center" >
                                Apply filters
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Filter