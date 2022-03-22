import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query";
import { createGroup } from "../../Queries/Group";
import { GroupCreateType } from "../../Types/Data";
import Notification from "../../Components/Notification";

const CreateGroup = () => {
    const { keycloak } = useKeycloak<KeycloakInstance>();
    const token: string | undefined = keycloak?.token;
    const queryClient = useQueryClient();
    
    const [created, setCreated] = useState<boolean>(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setPrivate] = useState(false);
    
    const mutation = useMutation((group: GroupCreateType) => createGroup(group, token), {
      onSuccess: () => {
        queryClient.invalidateQueries("groups");
      },
    });

    const onCreate = () => {
        if (title === '' && description === '') {
            console.error('please add title and description');
        }
            
        if (token != undefined) {
            setCreated(true);
    
            const newGroup: GroupCreateType = {
                name: title,
                description: description,
                isPrivate: isPrivate
            }
          mutation.mutate(newGroup);

          setTitle("");
          setDescription("");
        }
    }

    return (
      <div>
        <div className="bg-white my-6 p-4 rounded-sm shadow-md">
          <div className="px-6 py-4">
            <h1 className="text-xl text-gray-800">Create new group</h1>
            <div className="mt-6">
              <input
                type="text"
                className="w-full border border-gray-200 mb-4 p-1 rounded-sm px-2 text-sm text-gray-600 focus:outline-none focus:border-gray-300"
                placeholder="Group name"
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
              <div className="flex items-center ml-2">
                <div className="flex items-center mr-4">
                  <label>
                    <input
                      type="radio"
                      className="w-3 h-3"
                      name="privacySelect"
                      value="public"
                      checked={!isPrivate}
                      onChange={(e) => setPrivate(false)}
                    />
                    <span className="text-sm text-gray-800 ml-2">Public</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label>
                    <input
                      type="radio"
                      className="w-3 h-3"
                      name="privacySelect"
                      value="private"
                      checked={isPrivate}
                      onChange={(e) => setPrivate(true)}
                    />
                    <span className="text-sm text-gray-800 ml-2">Private</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex">
              <button
                type="button"
                className="text-white ml-auto bg-green-400 shadow hover:bg-green-300 rounded-full text-sm px-5 py-1 text-center"
                onClick={() => onCreate()}
              >
                Create group
              </button>
            </div>
          </div>
        </div>
        <Notification str="New group created!" created={created} setCreated={setCreated} />
      </div>
    );
}

export default CreateGroup