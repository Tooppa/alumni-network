const Buttons = ({user}: any) => {
    return (
        <div className="flex w-full justify-center pt-16 pb-16">
            <div className="flex flex-row w-full max-w-3xl justify-end">
                <button className="m-2">Posts</button>
                <p className="m-2">|</p>
                <button className="m-2">Calendar</button>
            </div>
        </div>
    )
}

export default Buttons