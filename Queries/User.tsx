import { UserType } from "../Types/Data";

export const getUser = (token: string = "" ) =>  
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/user`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        res => res.json()
    );

export const getUserById = (id: number, token: string = "" ) =>  
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        res => res.json()
    );
export const postUserById = (id: number, user: UserType, token: string = "") =>
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/user/${id}`, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(user)
    }).then(
        res => res.json()
    );

export const login = (token: string = "") =>
    fetch('https://alumni-network-api.azurewebsites.net/api/v1/user/login', {
        headers: { Authorization: `Bearer ${token}` }
    })