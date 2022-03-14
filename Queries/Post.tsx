export const getPosts = () => 
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/post`).then(
        res => res.json()
    );

export const getPost = ( id: number ) =>  
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/post/${id}`).then(
        res => res.json()
    );
