export const getTopics = (token: string = "") =>
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/topic`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        res => res.json()
    );
export const getTopic = (id: number, token: string = "") =>
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/topic/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        res => res.json()
    );