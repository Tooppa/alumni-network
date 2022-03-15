export const getPosts = (token: string = "") =>
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/post`, {
        headers: { Authentication: `Bearer ${token}` }
    }).then(
        res => res.json()
    );

export const getPost = (id: number, token: string = "") =>
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/post/${id}`, {
        headers: { Authentication: `Bearer ${token}` }
    }).then(
        res => res.json()
    );
