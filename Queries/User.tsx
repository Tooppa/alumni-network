export const getUsers = () =>
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/user`).then(
        res => res.json()
    );

export const getUser = ( id: number, token: string = "" ) =>  
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        res => res.json()
    );

export const login = (token: string = "") =>
    fetch('https://alumni-network-api.azurewebsites.net/api/v1/user/login', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(
        res => res.json()
    );