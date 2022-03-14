export const getUsers = () =>
    fetch(`https://alumni-network-api.azurewebsites.net/user`).then(
        res => res.json()
    );

export const getUser = ( id: number ) =>  
fetch(`https://alumni-network-api.azurewebsites.net/api/user/${id}`).then(
        res => res.json()
    );