import { API_URL } from '../utils/constants'

export async function getAddressesApi(auth) {
    try {
        const url = `${API_URL}/address/${auth.idUser}`;

        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
        };

        const response = await fetch(url, params);
        const result = await response.json();

        return result;

    } catch (error) {
        console.log("Error: address.js/getAddressesApi/ " + error);
        return null;
    }

}

export async function addAddressesApi(auth, address) {
    try {
        const url = `${API_URL}/address`;

        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({ user: auth.idUser, ...address }),
        };

        const response = await fetch(url, params);
        const result = await response.json();

        return result;

    } catch (error) {
        console.log("Error: address.js/getAddressesApi/ " + error);
        return null;
    }

}