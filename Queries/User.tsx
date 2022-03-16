export const getUser = (token: string = "" ) =>  
    fetch(`https://alumni-network-api.azurewebsites.net/api/v1/user`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        res => res.json()
    );

export const login = (token: string = "") =>
    fetch('https://alumni-network-api.azurewebsites.net/api/v1/user/login', {
      headers: { Authorization: `Bearer ${token}` }
    })