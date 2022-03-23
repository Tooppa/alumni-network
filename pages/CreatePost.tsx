import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';
import Image from 'next/image';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { sendPost } from '../Queries/Post';
import { Parameters } from '../Types/Parameters';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getUser } from '../Queries/User';
import { TopicType, UserType } from '../Types/Data';
import { getTopic } from '../Queries/Topic';

const CreatePost: React.FC<Parameters> = ({ topicId, groupId, parentId, targetUserId }) => {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const token: string | undefined = keycloak?.token;
  const queryClient = useQueryClient();
  const { data, status } = useQuery<UserType>('currentuser', () => getUser(token), { enabled: !!token });
  const { data: topic, status: topicStatus } = useQuery<TopicType>('topic', () => getTopic(Number(topicId), token), { enabled: !!token })

  const [postTitle, setPostTitle] = useState<string>(''); 
  const [postBody, setPostBody] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const mutation = useMutation((post: string) => sendPost(post,token), {
    onSuccess: () => { queryClient.invalidateQueries('frontpagePosts') }
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
      {status === "success" &&
        <div className="my-6 p-4 bg-white shadow-md rounded-sm">
          <div className="px-4 py-2">
            <div className="flex items-center mb-4 ml-1">
              <div className="flex items-center justify-center w-7 mr-4 rounded-full ring-2 ring-green-400">
                <div className="flex">
                  <Image
                    width={48}
                    height={48}
                    src={`/api/imagefetcher?url=${encodeURIComponent(data?.pictureURL)}`}
                    alt="Current user profile image"
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
                  value={postTitle}
                />
              </div>
            </div>
            <div className="my-2 text-sm text-gray-600">
              <h3>posting to: {topicStatus === 'success' ? topic?.name : 'Loading...'}</h3>
            </div>
            <textarea
              rows={4}
              className="border border-gray-200 w-full p-2 text-sm text-gray-600 rounded-sm resize-none focus:outline-none focus:border-gray-300"
              placeholder="Post something..."
              maxLength={300}
              onChange={async (e) => setPostBody(e.target.value)}
              value={postBody}
            />
            <div className="flex items-center mx-1 mt-1 mb-4">
              <div className="flex items-center">
                <div className="relative inline-block w-7 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    checked={showPreview}
                    value={showPreview ? "true" : "false"}
                    onChange={() => setShowPreview(!showPreview)}
                  />
                  <label
                    htmlFor="toggle"
                    className="toggle-label block overflow-hidden h-4 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
                <label htmlFor="toggle" className="text-xs text-gray-700">
                  Show markdown preview
                </label>
              </div>
              <p className="flex ml-auto text-xs text-gray-600">{postBody.length + " / 300"}</p>
            </div>
  
            {showPreview === true ? (
              <>
                <div
                  className="border border-gray-200 w-full p-2 mb-4 text-sm text-gray-600 rounded-sm min-h-[30px]"
                  
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {postBody}
                  </ReactMarkdown>
                </div>
              </>
              ) : (
              <></>
            )}

            <div className="flex">
              <button
                type="button"
                className="text-white ml-auto bg-green-400 shadow hover:bg-green-300 rounded-full text-sm px-5 py-1 text-center"
                onClick={() => {
                  onSendPost();
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

export default CreatePost;