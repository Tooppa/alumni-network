import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';
import Image from 'next/image';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { sendPost } from '../Queries/Post';
import { Parameters } from '../Types/Parameters';
import parse from "html-react-parser";
import parseHTML from '../Components/HTMLParser';

import styles from './CreatePost.module.css'

const CreatePost: React.FC<Parameters> = ({topicId,groupId,parentId,targetUserId}) => {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const token: string | undefined = keycloak?.token;
  const queryClient = useQueryClient()

  const [postTitle, setPostTitle] = useState<string>(''); 
  const [postBody, setPostBody] = useState<string>('');
  const [postBodyPreview, setPostBodyPreview] = useState<string>("");
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
            className="border border-gray-200 w-full p-2 mb-2 text-sm text-gray-600 rounded-sm focus:outline-none focus:border-gray-300"
            placeholder="Post something..."
            maxLength={300}
            onChange={async (e) => {
              setPostBody(e.target.value);
              setPostBodyPreview(await parseHTML(e.target.value));
            }}
            value={postBody}
          ></textarea>
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in mt-2 mb-2">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              checked={showPreview}
              value={showPreview ? 'true' : 'false'}
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
          {showPreview === true ?
              <>
                <h3>Preview:</h3>
                <div className="border border-gray-200 w-full p-2 mb-2 text-sm text-gray-600 rounded-sm focus:outline-none focus:border-gray-300" style={{minHeight: '30px'}}>
                  {parse(postBodyPreview)}
                </div>
            </>
            :
            <></>
          }

          <div className="flex">
            <button
              type="button"
              className="text-white ml-auto bg-green-400 shadow hover:bg-green-300 rounded-sm text-sm px-5 py-2 text-center"
              onClick={() => {
                onSendPost();
                setPostCreated(!postCreated);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="fill-current text-white h-4 mr-2"
              >
                <path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {postCreated && (
        <div className="flex bg-green-300 my-4 p-4 rounded-sm shadow-md">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="fill-current text-white h-4 mr-3"
            >
              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z" />
            </svg>
            <p className="text-white text-sm">New post created!</p>
          </div>
          <div className="flex ml-auto">
            <button
              type="button"
              className=""
              onClick={() => setPostCreated(!postCreated)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="fill-current text-white h-4 hover:text-gray-50"
              >
                <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CreatePost;