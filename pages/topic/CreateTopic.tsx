import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createTopic } from "../../Queries/Topic";
import { TopicCreateType } from "../../Types/Data";
import Notification from "../../Components/Notification";

const CreateTopic = () => {
    const { keycloak } = useKeycloak<KeycloakInstance>();
    const token: string | undefined = keycloak?.token;
    const queryClient = useQueryClient();
    
    const [created, setCreated] = useState(false);

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
        setCreated(true);

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
      <div className="bg-white my-6 p-4 rounded-sm shadow-lg">
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
              className="text-white ml-auto bg-green-400 shadow hover:bg-green-300 rounded-full text-sm px-3 py-2 text-center"
              onClick={() => onCreate()}
            >
              Create topic
            </button>
          </div>
        </div>
      </div>
      <Notification str="New topic created!" created={created} setCreated={setCreated} />
    </div>
  );
}

export default CreateTopic