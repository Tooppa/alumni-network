export type PostType = {
    "id": number,
    "title": string,
    "body": string,
    "timestamp": Date,
    "senderId": number,
    "senderName": string,
    "replyParentId": number,
    "replies": Array<number>
}