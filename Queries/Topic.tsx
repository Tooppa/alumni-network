export const getTopics = () =>
    fetch(`https://alumni-network-api.azurewebsites.net/topic`).then(
        res => res.json()
    );