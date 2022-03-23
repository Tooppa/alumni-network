import { PostType } from "../Types/Data";

export const getPosts = (token: string = "") =>
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/post`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        res => res.json()
    );

export const getPost = (id: number, token: string = "") =>
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        res => res.json()
    );

export const getPostsFromTopic = (id: number, token: string = "") =>
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/post/topic/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        res => res.json()
    );

export const getPostsFromGroup = (id: number, token: string = "") =>
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/post/group/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        res => res.json()
    );

export const getPostsWithIds = (ids: Array<number>, token: string = "") =>{
    let posts: Array<any> = []
    for (let id of ids) {
        posts.push(fetch(`https://alumni-network-api.azurewebsites.net/api/v1/post/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            res => res.json()
        ))
    }
    return Promise.all(posts)
}

export const sendPost = (post: string, token: string = "") =>
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/post`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: post,
    });
    
export const deletePost = (id: number, token: string = "") =>
  fetch(`https://alumni-network-api.azurewebsites.net/api/v1/post/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  });