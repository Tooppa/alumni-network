import { TopicCreateType } from "../Types/Data";

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

export const createTopic = (topic: TopicCreateType, token: string = "") =>
  fetch(`https://alumni-network-api.azurewebsites.net/api/v1/topic`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(topic),
  });

export const joinTopic = (id: number, token: string = "") =>
  fetch(`https://alumni-network-api.azurewebsites.net/api/v1/topic/${id}/join`, {
    method: "POST",
    headers: { 
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
            "Content-Type": "application/json",
    }
  }).then(
      res => res.json()
  );