import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';
import { userInfo } from 'os';
import React, { useState } from 'react';
import { useQuery } from "react-query";
import CreatePost from '../pages/CreatePost';
import { getUsers } from '../Queries/User';
import { UserType } from '../Types/Data';

const CreatePrivateMessage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    // default value hardcoded, not optimal
    const [targetUserId, setTargetUserId] = useState(1);
    const { keycloak } = useKeycloak<KeycloakInstance>();
    const token: string | undefined = keycloak?.token;
    const { data, status } = useQuery<Array<UserType>>('allUsers', () => getUsers(token), { enabled: !!token })
    
    const handleSelectUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTargetUserId(parseInt(e.target.value));
    }
    
    return(
        <>
            <select onChange={handleSelectUserChange}>
                {data?.filter(u => u.id !== currentUser.id).map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
            <CreatePost targetUserId={targetUserId}/>
        </>
    );
}

export default CreatePrivateMessage;