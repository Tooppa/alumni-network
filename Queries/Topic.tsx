export const getTopics = () =>
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/topic`).then(
        res => res.json()
    );