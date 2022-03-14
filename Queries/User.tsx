export const getUsers = () =>
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/user`).then(
        res => res.json()
    );

export const getUser = ( id: number ) =>  
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/user/${id}`).then(
        res => res.json()
    );