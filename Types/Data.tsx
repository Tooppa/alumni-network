export type PostType = {
  id: number,
  title: string,
  body: string,
  timestamp: Date,
  senderId: number,
  senderName: string,
  senderPictureURL: string,
  replyParentId: number,
  replies: Array<number>,
  targetGroupId?: number,
  groupName?: string,
  targetTopicId?: number,
  topicName?: string
}
export type TopicType = {
  id: number,
  name: string,
  description: string,
  posts: Array<number>
}
export type TopicCreateType = {
  name: string;
  description: string;
}
export type GroupType = {
  id: number,
  name: string,
  description: string,
  isPrivate: boolean,
  users: Array<number>,
  posts: Array<number>
}
export type GroupCreateType = {
  name: string,
  description: string,
  isPrivate: boolean,
}
export type UserType = {
  id?: number,
  name: string,
  pictureURL: string,
  status: string,
  bio: string,
  funFact: string,
  groups?: Array<number>,
  topics?: Array<number>
}