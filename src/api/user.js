import { API_URL } from '../utils/constants'

export async function registerApi(formData) {

    try {

        const url = `${API_URL}/auth/local/register`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;

    } catch (error) {
        console.log("Error: user.js/registerApi/ " + error);
        return null;
    }

}

export async function loginApi(formData) {

    try {

        const url = `${API_URL}/auth/local`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;

    } catch (error) {
        console.log("Error: user.js/loginApi/ " + error);
        return null;
    }

}

export async function getMeApi(token) {
    try {
        //console.log("user.js/getMeApi/token: " + token);

        const url = `${API_URL}/users/me`;

        const params = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, params);
        const result = await response.json();

        //console.log("user.js/getMeApi/response: " + response);
        return result;

    } catch (error) {
        console.log("Error: user.js/getMeApi/ " + error);
        return null;
    }

}

export async function updateUserApi(auth, formData) {
    try {
        const url = `${API_URL}/users/${auth.idUser}`;

        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify(formData),
        };

        const response = await fetch(url, params);
        const result = await response.json();

        //console.log("user.js/updateUserApi/response: " + result);
        return result;

    } catch (error) {
        console.log("Error: user.js/getMeApi/ " + error);
        return null;
    }

}