import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createTopic } from "../../Queries/Topic";
import { TopicCreateType } from "../../Types/Data";

const CreateTopic = () => {
    const { keycloak } = useKeycloak<KeycloakInstance>();
    const token: string | undefined = keycloak?.token;
    const queryClient = useQueryClient();
    
    const [topicCreated, setTopicCreated] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const mutation = useMutation((topic: TopicCreateType) => createTopic(topic, token), {
      onSuccess: () => {
        queryClient.invalidateQueries("topics");
      },
    });

    const onCreate = () => {
      if (title === "" && description === "") {
        console.error("please add title and description");
      }

      if (token != undefined) {
        setTopicCreated(true);

        const newTopic: TopicCreateType = {
          name: title,
          description: description,
        };
        mutation.mutate(newTopic);
        
        setTitle('');
        setDescription('');
      }
    };

    return (
      <div>
        <div className="bg-white my-6 p-4 rounded-sm shadow-md">
          <div className="px-6 py-4">
            <h1 className="text-xl text-gray-800">Create new topic</h1>
            <div className="mt-6">
              <input
                type="text"
                className="w-full border border-gray-200 mb-4 p-1 rounded-sm px-2 text-sm text-gray-600 focus:outline-none focus:border-gray-300"
                placeholder="Title"
                maxLength={50}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                rows={4}
                className="border border-gray-200 w-full p-2 mb-2 text-sm text-gray-600 rounded-sm focus:outline-none focus:border-gray-300"
                placeholder="Description"
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="flex">
              <button
                type="button"
                className="text-white ml-auto bg-green-400 shadow hover:bg-green-300 rounded-full text-sm px-5 py-1 text-center"
                onClick={() => onCreate()}
              >
                Create topic
              </button>
            </div>
          </div>
        </div>
        {topicCreated && (
          <div className="flex bg-green-300 my-4 p-4 rounded-sm shadow-md">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="fill-current text-white h-4 mr-3"
              >
                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z" />
              </svg>
              <p className="text-white text-sm">New topic created!</p>
            </div>
            <div className="flex ml-auto">
              <button
                type="button"
                className=""
                onClick={() => setTopicCreated(!topicCreated)}
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
      </div>
    );
}

export default CreateTopic