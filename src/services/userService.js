import {API_CREATE, API_LOGIN} from "../api";

export const handleResponse = (response) => {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                console.log(response.statusText);
            }
            return Promise.reject(response);
        }
        return data;
    });
}

export const login = async (login, password) => {
    return await fetch(API_LOGIN, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({login, password})
    }).then(handleResponse)
}
export const addUser = async (form) => {
    return await fetch(API_CREATE, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...form})
    }).then(handleResponse)
}