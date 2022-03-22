import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';
import Image from 'next/image';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { sendPost } from '../Queries/Post';
import { getUser } from '../Queries/User';
import { Parameters } from '../Types/Parameters';
import { UserType } from '../Types/Data';

const CreatePost: React.FC<Parameters> = ({ topicId, groupId, parentId, targetUserId }) => {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const token: string | undefined = keycloak?.token;
  const queryClient = useQueryClient()
  const { data, status } = useQuery<UserType>('currentuser', () => getUser(token), { enabled: !!token });

  const [postTitle, setPostTitle] = useState<string>('');
  const [postBody, setPostBody] = useState<string>('');
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
    }
    else
      console.error('Message sending failed, token is undefined');
  }

  return (
    <>
      {status === "success" &&
        <div className="my-6 p-4 bg-white shadow-md rounded-sm">
          <div className="px-4 py-2">
            <div className="flex mb-4 items-center ml-1">
              <div className="flex items-center justify-center w-7 mr-4 rounded-full ring-2 ring-green-400">
                <div className="flex">
                  <Image
                    width={48}
                    height={48}
                    src={`/api/imagefetcher?url=${encodeURIComponent(data?.pictureURL)}`}
                    alt="user photo"
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="flex w-full">
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-sm px-2 py-1 text-sm text-gray-600 focus:outline-none focus:border-gray-300"
                  placeholder="Title"
                  maxLength={50}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
              </div>
            </div>
            <textarea
              rows={4}
              className="border border-gray-200 w-full p-2 mb-2 text-sm text-gray-600 rounded-sm resize-none focus:outline-none focus:border-gray-300"
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
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default CreatePost