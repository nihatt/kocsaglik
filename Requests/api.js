const BASE_URL = 'https://dummyjson.com';

async function sendRequest(path, options = {}) {
    const url = `${BASE_URL}${path}`;
    const response = await fetch(url, options);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }

    const data = await response.json();
    return data;
}

const api = {
    getProducts: async () => {
        const path = '/products';
        const products = await sendRequest(path);
        return products;
    },

};

export default api;