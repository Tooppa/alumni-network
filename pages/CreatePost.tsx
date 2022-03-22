import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';
import Image from 'next/image';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { sendPost } from '../Queries/Post';
import { Parameters } from '../Types/Parameters';
import Notification from '../Components/Notification'

const CreatePost: React.FC<Parameters> = ({ topicId, groupId, parentId, targetUserId }) => {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const token: string | undefined = keycloak?.token;
  const queryClient = useQueryClient()

  const [postTitle, setPostTitle] = useState<string>('');
  const [postBody, setPostBody] = useState<string>('');
  const [created, setCreated] = useState<boolean>(false);
  const mutation = useMutation((post: string) => sendPost(post, token), {
    onSuccess: () => { queryClient.invalidateQueries('posts') }
  })

  const getPostType = () => {
    return {
      title: postTitle,
      body: postBody,
      TargetTopicId: topicId,
      TargetGroupId: groupId,
      ReplyParentId: parentId,
      TargetUserId: targetUserId,
    }
  };

  const onSendPost = () => {
    if (postTitle === '' || postBody === '')
      return;
    //check if parameters are set
    if (!topicId && !groupId && !parentId && !targetUserId) {
      console.error("Parameters not set for CreatePost component");
      return;
    }

    // Send post to backend server
    if (token != undefined) {
      mutation.mutate(JSON.stringify(getPostType()));
      setPostBody('')
      setPostTitle('')
    }
    else
      console.error('Message sending failed, token is undefined');
  }

  return (
    <>
      <div className="my-6 p-4 bg-white shadow-md rounded-sm">
        <div className="px-4 py-2">
          <div className="flex mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full mr-2 bg-green-300">
              <Image
                width={24}
                height={24}
                src="/vercel.svg"
                alt="user photo"
              />
            </div>
            <input
              type="text"
              className="w-full border border-gray-200  rounded-sm px-2 text-sm text-gray-600 focus:outline-none focus:border-gray-300"
              placeholder="Title"
              maxLength={50}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </div>
          <textarea
            rows={4}
            className="border border-gray-200 w-full p-2 mb-2 text-sm text-gray-600 rounded-sm focus:outline-none focus:border-gray-300"
            placeholder="Post something..."
            maxLength={300}
            onChange={(e) => setPostBody(e.target.value)}
          ></textarea>
          <div className="flex">
            <button
              type="button"
              className="text-white ml-auto bg-green-400 shadow hover:bg-green-300 rounded-full text-sm px-5 py-1 text-center"
              onClick={() => {
                onSendPost()
                setCreated(!created)
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <Notification str="New post updated" created={created} setCreated={setCreated} />
    </>
  );
}

export default CreatePost