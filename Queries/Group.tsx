import { GroupCreateType } from "../Types/Data";

export const getGroups = (token: string = "") =>
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/group`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        res => res.json()
    );
export const getGroup = (id: number, token: string = "") =>
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/group/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        res => res.json()
    );

export const createGroup = (group: GroupCreateType, token: string = "") =>
  fetch(`https://alumni-network-api.azurewebsites.net/api/v1/group`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  });