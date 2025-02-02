import { API_URL } from '../utils/constants'

export async function getLastProductApi(limit = 30) {
    try {
        const url = `${API_URL}/products?_limit=${limit}&_sort=createAt:DESC`;

        const response = await fetch(url);
        const result = await response.json();
        return result;

    } catch (error) {
        console.log("Error: address.js/getAddressesApi/ " + error);
        return null;
    }

}

export async function getProductApi(id) {
    try {
        const url = `${API_URL}/products/${id}`;
        const response = await fetch(url);
        const result = await response.json();

        return result;
    } catch (error) {
        console.log("Error: address.js/getAddressesApi/ " + error);
        return null;
    }

}