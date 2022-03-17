const CreateTopic = () => {
    return (
        <div className="bg-white my-6 p-4 rounded-sm shadow-lg">
            <div className="px-6 py-4">
                <h1 className="text-xl text-gray-800">Create new topic</h1>
                <div className="mt-6">
                    <input type="text" className="w-full border border-gray-200 mb-4 p-1 rounded-sm px-2 text-sm text-gray-600 focus:outline-none focus:border-gray-300" placeholder="Title" maxLength={50} />
                    <textarea rows={4} className="border border-gray-200 w-full p-2 mb-2 text-sm text-gray-600 rounded-sm focus:outline-none focus:border-gray-300" placeholder="Description" maxLength={200} ></textarea>
                </div>
                <div className="flex">
                    <button type="button" className="text-white ml-auto bg-green-400 shadow hover:bg-green-300 rounded-full text-sm px-3 py-2 text-center">
                        Create topic
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateTopic