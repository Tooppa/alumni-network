import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';
import Image from 'next/image';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { sendPost } from '../Queries/Post';
import { Parameters } from '../Types/Parameters';
import { UserType } from '../Types/Data';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Notification from '../Components/Notification'

const CreatePost: React.FC<Parameters> = ({ topicId, groupId, parentId, targetUserId }) => {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const token: string | undefined = keycloak?.token;
  const queryClient = useQueryClient()

  const [postTitle, setPostTitle] = useState<string>(''); 
  const [postBody, setPostBody] = useState<string>('');
  const [postCreated, setPostCreated] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const mutation = useMutation((post: string) => sendPost(post,token), {
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
            rows={8}
            className="border border-gray-200 w-full p-2 m-0 p0 text-sm text-gray-600 rounded-sm focus:outline-none focus:border-gray-300"
            placeholder="Post something..."
            maxLength={300}
            onChange={async (e) => setPostBody(e.target.value)}
            value={postBody}
          ></textarea>
          <p className="flex justify-end text-sm text-gray-600 m-0 p-0">{ postBody.length + " / 300"  }</p>
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in mt-2 mb-2">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              checked={showPreview}
              value={showPreview ? "true" : "false"}
              onChange={() => setShowPreview(!showPreview)}
            />
            <label
              htmlFor="toggle"
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
          <label htmlFor="toggle" className="text-xs text-gray-700">
            Show markdown preview
          </label>
          {showPreview === true ? (
            <>
              <h3>Preview:</h3>
              <div
                className="border border-gray-200 w-full p-2 mb-2 text-sm text-gray-600 rounded-sm focus:outline-none focus:border-gray-300"
                style={{ minHeight: "30px" }}
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
                setPostCreated(!postCreated);
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;