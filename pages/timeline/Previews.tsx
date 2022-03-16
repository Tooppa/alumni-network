import GroupPreview from "./GroupPreview"
import TopicPreview from "./TopicPreview"

const Previews = () => {
    const fakeTopicPreview = {
        name: "Amazing topic",
        users: [
            {
                name: "Batman"
            }
        ],
        posts: [
            {
                title: "This is test post"
            }
        ]
    }

    const fakeGroupPreview = {
        name: "Amazing group",
        users: [
            {
                name: "Batman"
            }
        ],
        posts: [
            {
                title: "This is test post"
            }
        ]
    }

    return (
        <div className="my-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <TopicPreview topicPreview={fakeTopicPreview} />
                </div>
                <div>
                    <GroupPreview groupPreview={fakeGroupPreview} />
                </div>
            </div>
        </div>
    )
}

export default Previews