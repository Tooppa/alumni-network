export const getGroups = () =>
    fetch(`https://alumni-network-api.azurewebsites.net/group`).then(
        res => res.json()
    );