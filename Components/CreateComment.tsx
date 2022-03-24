import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import { sendPost } from "../Queries/Post";
import { PostType } from '../Types/Data';

const CreateComment: React.FC<{ post: PostType, token: string, postList: string}> = ({ post, token, postList }) => {
    const [comment, setComment] = useState("");
    const queryClient = useQueryClient();
    const mutation = useMutation((post: string) => sendPost(post,token), {
        onSuccess: () => { queryClient.invalidateQueries(postList) }
      })
    
      const onCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setComment(e.target.value);
	};

    const onCommentSubmit = () => {
        if (comment === '')
            return
        if (token != undefined) {
            mutation.mutate(JSON.stringify(getPostType()));
            setComment('');
        }
        else
            console.error('Message sending failed, token is undefined');
    }

    const getPostType = () => {
        return {
          title: "",
          body: comment,
          TargetTopicId: null,
          TargetGroupId: null,
          ReplyParentId: post.id,
          TargetUserId: null,
        }
      };
    
    return(
        <div className="flex">
            <input
                type="text"
                onChange={onCommentInputChange}
                value={comment}
                placeholder="Comment..."
                className="border border-gray-200 w-full rounded-sm px-2 py-1 text-gray-600 text-sm focus:outline-none focus:border-gray-300"
            />
            <button
            type="button"
            onClick={onCommentSubmit}
            className="text-white text-sm bg-green-400 rounded-full shadow text-center inline-flex items-center px-5 py-1 ml-2 hover:bg-green-300"
            >
            Post
            </button>
        </div>
    );
}

export default CreateComment;