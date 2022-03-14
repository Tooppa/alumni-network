export const getGroups = () =>
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/group`).then(
        res => res.json()
    );