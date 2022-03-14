export const getPosts = () => 
    fetch(`https://alumni-network-api.azurewebsites.net/api/post`).then(
        res => res.json()
    );