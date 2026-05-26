import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://nami-online-api.vercel.app";

const api = axios.create({
    baseURL,
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
