export const getUsers = () =>
    fetch(`https://alumni-network-api.azurewebsites.net/user`).then(
        res => res.json()
    );