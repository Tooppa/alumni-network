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
export type TopicType = {
  "name": string,
  "description": string,
  "posts": Array<number>
}
export type GroupType = {
    "id": number,
    "name": string,
    "description": string,
    "isPrivate": boolean,
    "users": Array<number>,
    "posts": Array<number>
}