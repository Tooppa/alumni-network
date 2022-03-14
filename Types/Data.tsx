export type PostType = {
    "id": number,
    "title": string,
    "body": string,
    "timestamp": Date,
    "senderId": number,
    "replyParentId": number,
    "replies": Array<number>
}