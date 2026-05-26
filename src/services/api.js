import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000',
});
//Hugo - Alteração para a função Lembre-me.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('nami_token') || sessionStorage.getItem('nami_token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
